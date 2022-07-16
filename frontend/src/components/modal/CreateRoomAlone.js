import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function CreateRoomAlone({ closeModal }) {

    const Options = [
        {
            key: 1,
            value: "컴퓨터구조",
        },
        {
            key: 2,
            value: "자료구조",
        },
        {
            key: 3,
            value: "데이터베이스",
        },
        {
            key: 4,
            value: "네트워크",
        },
        {
            key: 5,
            value: "운영체제",
        },
        {
            key: 6,
            value: "알고리즘",
        },
        {
            key: 7,
            value: "디자인패턴",
        },
        {
            key: 8,
            value: "JavaScript",
        },
        {
            key: 9,
            value: "Java",
        },
        {
            key: 10,
            value: "React",
        },
        {
            key: 11,
            value: "기본질문",
        },
        {
            key: 12,
            value: "개발상식",
        },
        {
            key: 13,
            value: "프론트엔드",
        },
        {
            key: 14,
            value: "백엔드",
        },
    ];

    const SendRequest = async () => {
        const res = await fetch(
            "http://localhost:8000/training/questions/"
        ).then((res) => res.json());
    }

    return (
        <div className="Create-delete-modal">
            <div className="Create-delete-modal-content">
                <div className="Create-delete-modal-body">
                    <h1>연습을 준비해 볼까요?</h1>
                </div>
                <div className="CreateRoomAlone-Check" style={{}}>
                    <div>
                        <div><h3>CS/언어/기본질문 및 개발상식/직무별</h3></div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="CS">
                                <Dropdown.Item onClick={() => console.log("a")} href="#">{Options[0].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[1].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[2].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[3].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[4].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[5].value}</Dropdown.Item>
                                <Dropdown.Item href="#">{Options[6].value}</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="언어">
                                <Dropdown.Item href="#/action-1">{Options[7].value}</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">{Options[8].value}</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">{Options[9].value}</Dropdown.Item>

                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="기본질문 및 개발상식">
                                <Dropdown.Item href="#/action-1">{Options[10].value}</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">{Options[11].value}</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div>
                            <DropdownButton id="dropdown-basic-button" title="직무별">
                                <Dropdown.Item href="#/action-1">{Options[12].value}</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">{Options[13].value}</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                    <div>

                    </div>

                    <div className="Create-delete-modal-footer">
                        <button className="btn-start">연습시작</button>
                        <button className="btn-close" onClick={() => closeModal(false)}>취소</button>
                    </div>
                </div >
            </div >
        </div >
    )
}

function DropCategory1() {
    return (
        <DropdownButton id="dropdown-basic-button" title="선택해주세요">
            <Dropdown.Item href="#/action-1"></Dropdown.Item>
            <Dropdown.Item href="#/action-1">Category1[0]</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Category1[0]</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Category1[0]</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Category1[0]</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Category1[0]</Dropdown.Item>
        </DropdownButton>
    );
}

function DropCategory2() {
    return (
        <DropdownButton id="dropdown-basic-button" title="선택해주세요">
            <Dropdown.Item href="#/action-1"></Dropdown.Item>
            <Dropdown.Item href="#/action-2">카테고리별</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
    );
}
export default CreateRoomAlone