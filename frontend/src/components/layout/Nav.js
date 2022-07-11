import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Outlet} from "react-router"


class Navbar extends Component {
    render() {
        return (
         <>  
            <div>

                <div>
                    <div className="navigation-bar"> 
                        <Link to="/" style={{textDecoration: 'none'}}><div className="navigation-bar-logo"> TECHTERVIEW </div></Link> 
                        <div className="navigation-bar-right">
                            <Link to="/questionlist"><button className="interview-question-page-btn">질문 리스트</button></Link>
                            <Link to="/feedback"><button className="interview-feedback-page-btn">피드백</button></Link>
                            <Link to="/myvideo"><button className="interview-my-page-btn">마이페이지</button></Link>
                            <Link to="/login"><button className="interview-login-page-">로그인</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
            </> 
        )
    }
}
export default Navbar