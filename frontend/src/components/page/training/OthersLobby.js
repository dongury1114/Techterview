import React, { Component } from 'react';
// import * as Icon from 'react-bootstrap-icons';
import QuestionMenu from '../questionList/Menu';
import {Link} from 'react-router-dom';



class OthersLobby extends Component {
    render() {
        return (
            <div>
                <div className='others-lobby-header2'>
                    <QuestionMenu />
                    <Link to ="/training/others"><button className='others-lobby-enter-room-btn'>방 만들기</button></Link>
                </div>
                <div>
                    <div class="grid-container-box">
                        <div class="grid-container">
                            <div class="grid-item"><img className="video-thumbnail-second-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item"><img className="video-thumbnail-third-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item">2</div>
                            <div class="grid-item">1</div>
                            <div class="grid-item">3</div>
                        </div>
                    </div>
                    <div class="grid-container-box">
                        <div class="grid-container">
                            <div class="grid-item"><img className="video-thumbnail-second-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item-first-place"><img className="video-thumbnail-first-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item"><img className="video-thumbnail-third-place" src={require("../../images/video_thumbnail.png")} alt={"video thumbnail"} />   </div>
                            <div class="grid-item">2</div>
                            <div class="grid-item">1</div>
                            <div class="grid-item">3</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OthersLobby

