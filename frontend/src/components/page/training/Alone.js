import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';

function TrainingAlone() {
    const { key } = useParams();
    let data = []

    axios.get(`http://localhost:8000/training/alone/api/questions/${key}`)
        .then((res) => {
            // console.log(res);
            (res.data.value).forEach((value) => {
                data.push(value)
                // cnt = cnt + 1;
            });
        })

    const [Questions, SetQuestions] = useState(data);
    const [QuestionsIndex, SetQuestionsIndex] = useState(-1);
    // console.log(Questions)

    return (
        <div className="training-container">
            <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
            <div className="training-navigation-bar-logo"> TECHTERVIEW </div>
            <div className='traing-inner-box'>
                <div style={{ color: 'white' }}>{Questions[QuestionsIndex]}</div>
                <div><audio controls src=''> </audio></div>
                <div className='training-alone-dropbox'></div>
            </div>
            <div className='training-footer'>
                <div className="training-container-box">
                    <div className="training-item1" onClick={() => {
                        SetQuestionsIndex(0)
                    }} ><img className="video-thumbnail-second-place" src={require("../../images/start.png")} alt={"start button"} /></div>
                    <div className="training-item-first-place" onClick={() => {
                        SetQuestionsIndex(QuestionsIndex + 1)
                    }} ><img className="video-thumbnail-first-place" src={require("../../images/next.png")} alt={"next button"} />   </div>
                    <div className="training-item"><img className="video-thumbnail-third-place" src={require("../../images/end.png")} alt={"end button"} />   </div>
                </div>
            </div>
        </div >
    )
}



export default TrainingAlone