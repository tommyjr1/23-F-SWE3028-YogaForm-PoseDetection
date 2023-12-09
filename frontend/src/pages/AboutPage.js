import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";
import routineIcon from "../assets/routine_image.png";
import coachIcon from "../assets/coach_image.webp";

// axios.defaults.withCredentials = true;

const AboutPage = () => {
  const [routines, setRoutines] = useState();
  const navigate = useNavigate();

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      
      <div>
        <h1>YOGA FORM is the best web page for doing yoga alone!</h1>
        <h2>Functions</h2>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", gap: "15px", textAlign: "center"}}>
          <div style={{width: "400px", border: "4px solid #282c34", borderRadius: "5px"}}>
            <img src={routineIcon} style={{width: "160px"}}></img>
            <h3>Yoga Routine</h3>
            <p>You can click the <a href="/YogaList">POSES</a> tab to find out different yoga poses, and make your own routine among them. You need to log-in to use this function.</p>
          </div>
          <div style={{width: "400px", border: "4px solid #282c34", borderRadius: "5px"}}>
            <img src={coachIcon} style={{width: "160px"}}></img>
            <h3>Yoga Coach</h3>
            <p>In the <a href="/">HOME</a> tab, press the start button to start your yoga. If you are a guest, we offer default easy and hard routines. After the selection, the camera is on and checks whether your whole body is seen. If your whole body joints are captured, yoga coach starts!
            If your joints are similar to the correct pose by 15% error, it moves on to the next pose, and after the routine ends, you can check the score of each pose and the average score.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
