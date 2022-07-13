import React, { Component, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Outlet} from "react-router"

function Navbar() {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const GOOGLE_CODE = location.search.split('=')[1];
    // const GOOGLE_SCOPE = location.search.split('=')[2];
    // useEffect(() => {
    //     fetch(`http://localhost:8000/auth/google/callback?code=${GOOGLE_CODE + GOOGLE_SCOPE}`, {
    //         method: 'GET',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             localStorage.setItem('token', data);
    //             navigate('/');
    //         });
    // }, []); 
  return (
    <>  
            <div>

                <div>
                    <div className="navigation-bar"> 
                        <Link to="/" style={{textDecoration: 'none'}}><div className="navigation-bar-logo"> TECHTERVIEW </div></Link> 
                        <div className="navigation-bar-right">
                            <Link to="/questionlist/mainpage"><button className="interview-question-page-btn">질문 리스트</button></Link>
                            <Link to="/feedback/mainpage"><button className="interview-feedback-page-btn">피드백</button></Link>
                            <Link to="/feedback/myvideo"><button className="interview-my-page-btn">마이페이지</button></Link>
                            <Link to="/login"><button className="interview-login-page-">로그인</button></Link>
                            <a href="/logout"><button className="interview-login-page-">로그아웃</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
            </> 
  )
}

export default Navbar

// import React, { Component, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {Outlet} from "react-router"


// // function googlelogin() {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const GOOGLE_CODE = location.search.split('=')[1];
// //     console.log(GOOGLE_CODE)
// //     useEffect(() => {

// //         fetch(`http://localhost:8000/auth/google/callback?code=${GOOGLE_CODE}`, {
// //             method: 'GET',
// //         })
// //             .then(res => res.json())
// //             .then(data => {
// //                 console.log(data)
// //                 localStorage.setItem('token', data);
// //                 navigate('/');
// //             });
// //     }, []); 
// // }

// class Navbar extends Component {


//     render() {
//         return (
//          <>  
//             <div>
                
//                 <div>
//                     <div className="navigation-bar"> 
//                         <Link to="/" style={{textDecoration: 'none'}}><div className="navigation-bar-logo"> TECHTERVIEW </div></Link> 
//                         <div className="navigation-bar-right">
//                             <Link to="/questionlist"><button className="interview-question-page-btn">질문 리스트</button></Link>
//                             <Link to="/feedback"><button className="interview-feedback-page-btn">피드백</button></Link>
//                             <Link to="/myvideo"><button className="interview-my-page-btn">마이페이지</button></Link>
//                             <Link to="/login"><button className="interview-login-page-">로그인</button></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Outlet/>
//             </> 
//         )
//     }
// }
// export default Navbar