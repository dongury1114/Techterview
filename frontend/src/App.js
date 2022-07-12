import React, { Component } from "react"
import "./index.css"
import "./components/modal/VideoDeleteModal.css"
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Nav"
import Mainbody from "./components/page/Main"
import Feedback from "./components/page/Feedback"
import FeedbackDetail from "./components/page/FeedbackDetail"
import MyVideo from "./components/page/MyVideo";
import Login from "./components/page/LogIn";
import QuestionList from "./components/page/QuestionList";
import TrainingAlone from "./components/page/TrainingAlone";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Mainbody />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/myvideo" element={<MyVideo/>}/>
              <Route path="/questionlist" element={<QuestionList />}/>
              <Route path="/feedback" element={<Feedback />}/>
              <Route path="/feedbackdetail" element={<FeedbackDetail />}/>
            </Route>
            <Route path="/trainingalone" element={<TrainingAlone/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;