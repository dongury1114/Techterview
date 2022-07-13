import React, { Component } from "react"
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import axios from 'axios';

import "./index.css"
import "./components/modal/VideoDeleteModal.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/layout/Nav"
import Mainbody from "./components/page/Main"
import Feedback from "./components/page/feedback/MainPage"
import FeedbackDetail from "./components/page/feedback/Detail"
import MyVideo from "./components/page/feedback/MyVideo";
import Login from "./components/page/LogIn";
import QuestionList from "./components/page/questionList/MainPage";
import TrainingAlone from "./components/page/training/Alone";
import TrainingOthers from "./components/page/training/Others";


class App extends Component {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Mainbody />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feedback/Myvideo" element={<MyVideo />} />
              <Route path="/questionlist/mainpage" element={<QuestionList />} />
              <Route path="/feedback/mainpage" element={<Feedback />} />
              <Route path="/feedback/Detail" element={<FeedbackDetail />} />

            </Route>

            <Route path="/training/Alone" element={<TrainingAlone />} />
            <Route path="/Training/Others" element={<TrainingOthers/>}/>

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;