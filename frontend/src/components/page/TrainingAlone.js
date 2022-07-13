import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import create from 'zustand'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

import ReactDOM from "react-dom";
import Record from './Record';

import "./styles.css";
import { useRecordWebcam } from "react-record-webcam";
import zustand from 'zustand';

function TrainingAlone() {

    const OPTIONS = { filename: "test-filename", fileType: "mp4", width: 500, height: 500 };
    const recordWebcam = useRecordWebcam(OPTIONS);

    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>

            <div className='traing-inner-box'>
                <div className='training-alone-dropbox'>
                    < div className="training-grid-container-box" >
                        <div className="training-grid-container">
                            <div className="grid-item">
                                <video controls autoPlay={true}>
                                    <source src="../video/sample1.mp4" type="video/webm" />
                                </video>
                            </div>

                            <div>
                            </div>

                            <div className="grid-item">
                                <video className="VideoMirror"
                                    ref={recordWebcam.webcamRef}
                                    autoPlay
                                />
                                <div>
                                    <button
                                        onClick={recordWebcam.open}
                                    >
                                        Open camera
                                    </button>
                                    <button
                                        onClick={recordWebcam.close}
                                    >
                                        Close camera
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='training-footer'>
                <div className="training-container-box">
                    <div className="training-item1">
                        <button onClick={recordWebcam.start}
                            style={{ backgroundColor: 'black' }}><img className="video-thumbnail-finst-place" src={require("../images/start.png")} alt={"start button"} /></button>
                    </div>

                    <div className="training-item-first-place">

                        <button style={{ backgroundColor: 'black' }} onClick={recordWebcam.stop}>
                            <img className="video-thumbnail-second-place" src={require("../images/next.png")} alt={"next button"} />
                        </button>
                    </div>
                    <div className="training-item">
                        <button style={{ backgroundColor: 'black' }} onClick={recordWebcam.download}>
                            <img className="video-thumbnail-third-place" src={require("../images/end.png")} alt={"end button"} />

                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}




// const RecordTest = () => {

//     const OPTIONS = { filename: "test-filename", fileType: "mp4", width: 500, height: 500 };
//     const recordWebcam = useRecordWebcam(OPTIONS);
//     const getRecordingFileHooks = async () => { const blob = await recordWebcam.getRecording(); console.log({ blob }); };

//     return (
//         <div>
//             <div>
//                 <button
//                     onClick={recordWebcam.open}
//                 >
//                     Open camera
//                 </button>
//                 <button
//                     disabled={
//                         recordWebcam.status === CAMERA_STATUS.CLOSED ||
//                         recordWebcam.status === CAMERA_STATUS.PREVIEW
//                     }
//                     onClick={recordWebcam.close}
//                 >
//                     Close camera
//                 </button>
//                 <button

//                     onClick={recordWebcam.start}
//                 >
//                     Start recording
//                 </button>
//                 <button
//                     onClick={recordWebcam.stop}
//                 >
//                     Stop recording
//                 </button>
//                 <button
//                     onClick={recordWebcam.download}
//                 >
//                     Download
//                 </button>

//             </div>

//             <video className="VideoMirror"
//                 ref={recordWebcam.webcamRef}
//                 style={{

//                 }}

//                 autoPlay
//                 muted
//                 mirrored="true"
//             />
//         </div>
//     );
// }

export default TrainingAlone

