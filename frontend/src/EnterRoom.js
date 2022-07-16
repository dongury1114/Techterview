import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

// 화면구성 추가 dei
// 정보들? mywebrtc
const OPENVIDU_SERVER_URL = 'https://13.125.106.69';
const OPENVIDU_SERVER_SECRET = 'techterview';
// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
// const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


class EnterRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],

            // 추가
            audio: this.props.audio,
            video: this.props.video,
            userModel: undefined,
            roomId: this.props.roomId,
            ws: this.props.ws, // 이건 뭘까? 알아보기
            roomTitle: this.props.roomTitle,

        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        // 추가
        this.getConnectionId = this.getConnectionId.bind(this);
        this.setConnectionId = this.setConnectionId.bind(this);
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onbeforeunload);  //beforeunload => 사용자가 페이지를 이탈하려고 할 때 호출하는 함수

        setTimeout(this.joinSession, 1000);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    // nicknameChanged(nickname) {
    //     let localUser = this.state.localUser;
    //     localUser.setNickname(nickname);
    //     this.setState({ localUser: localUser });
    //     this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    // }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session --- 세션초기화

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {

                    // 추기
                    this.setState({
                        sessionToken: token,
                    });
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname

                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                // 수정
                                // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam

                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                            this.sendSignalUserVideo(this.props.video);
                            this.sendSignalUserAudio(this.props.audio);
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }


    // 수정부분 없음
    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
        console.log(this.state.publishAudio);
        console.log(this.state.publishVideo);
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        // 수정할게 존나게 많음
        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        {/* <div id="img-div">
                        </div> */}
                        <div id="join-dialog" className="jumbotron vertical-center">
                            {/* <h1> Join a video session </h1> */}
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <div className='VidParticipantInputBox'>

                                        <label className="nickname">닉네임: </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="userName"
                                            value={myUserName}
                                            onChange={this.handleChangeUserName}
                                            required
                                        />
                                    </div>

                                </p>
                                <p>
                                    <div className='VidSessionInputBox'>
                                        <label className="sessionId"> 방 : </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="sessionId"
                                            value={mySessionId}
                                            onChange={this.handleChangeSessionId}
                                            required
                                        />
                                    </div>
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="main-video-box">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                {/* <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonSwitchCamera"
                                    onClick={this.switchCamera}
                                    value="Switch Camera"
                                /> */}
                            </div>
                        ) : null}
                        {/* id="video-container" className="col-md-6 */}
                        <div id="video-container">
                            {/* {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null} */}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="secondary-video-box" onClick={() => this.handleMainVideoStream(sub)}>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                        <div id="session-header">
                            {/* <h1 id="session-title">{mySessionId}</h1> */}
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="종료"
                            />
                        </div>

                    </div>
                ) : null}
            </div>
        );
    }


    // 수정부분 아님 
    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */


    getToken() {
        console.log(this.state.mySessionId)
        console.log(this)
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default EnterRoom;
