import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function TrainingAlone() {
    const { key } = useParams();

    const getQuestion = async () => {
        const json = await (
            fetch(`http://localhost:8000/traing/questions/${key}`)
        ).json()
        console.log(json());

    }
    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
            <div className='traing-inner-box'>
                <div className='training-alone-dropbox'></div>
            </div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div className="training-item1">1<img className="video-thumbnail-second-place" src={require("../../images/start.png")} alt={"start button"} /></div>
                    <div className="training-item-first-place"><img className="video-thumbnail-first-place" src={require("../../images/next.png")} alt={"next button"} />   </div>
                    <div className="training-item"><img className="video-thumbnail-third-place" src={require("../../images/end.png")} alt={"end button"} />   </div>
                </div>
            </div>
        </div>
    )
}



export default TrainingAlone