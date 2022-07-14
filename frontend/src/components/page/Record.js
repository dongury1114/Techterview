import "./styles.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";


const Record = () => {
    const OPTIONS = {
        filename: "test-filename",
        fileType: "mp4",
        width: 500,
        height: 500,

    };
    const RecordView = () => {
        const {
            status,
            startRecording,
            stopRecording,
            mediaBlobUrl
        } =
            useReactMediaRecorder({
                video: true,
                facingMode: {
                    exact: "environment",
                }
            });

        return (
            <div>
                <p>{status}</p>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
                <video src={mediaBlobUrl} controls autoPlay loop />
            </div>
        );
    };

    const recordWebcam = useRecordWebcam(OPTIONS);
    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        console.log({ blob });
    };

    return (
        <div>
            {/* <RecordView /> */}
            {/* Camera status: {recordWebcam.status} */}
            <h1>화면 최종 테스트 입니다</h1>
            <div>
                <button
                    onClick={recordWebcam.open}
                >
                    Open camera
                </button>
                <button
                    disabled={
                        recordWebcam.status === CAMERA_STATUS.CLOSED ||
                        recordWebcam.status === CAMERA_STATUS.PREVIEW
                    }
                    onClick={recordWebcam.close}
                >
                    Close camera
                </button>
                <button

                    onClick={recordWebcam.start}
                >
                    Start recording
                </button>
                <button
                    onClick={recordWebcam.stop}
                >
                    Stop recording
                </button>
                <button
                    onClick={recordWebcam.download}
                >
                    Download
                </button>

            </div>

            <video className="VideoMirror"
                ref={recordWebcam.webcamRef}

                // style={{
                //     display: `${recordWebcam.status === CAMERA_STATUS.OPEN ||
                //         recordWebcam.status === CAMERA_STATUS.RECORDING
                //         ? "block"
                //         : "none"
                //         }`
                // }}
                style={{

                }}

                autoPlay
                muted
                mirrored="true"
            />
            {/* <video
                ref={recordWebcam.previewRef}
                // style={{
                //     display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
                //         }`
                // }}
                controls
            /> */}
        </div>
    );
}

export default Record

// https://codesandbox.io/s/xm6fp?file=/src/App.js:1044-3623