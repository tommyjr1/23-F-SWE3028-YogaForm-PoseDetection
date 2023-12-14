import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";
import routineIcon from "../assets/routine_image.png";
import coachIcon from "../assets/coach_image.png";
import cameraIcon from "../assets/camera_image.png";
import aloneIcon from "../assets/alone_image.png";
import wholeIcon from "../assets/whole_image.png";
import clothesIcon from "../assets/clothes_image.png";

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
        <h2>Acquirements</h2>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", gap: "15px", textAlign: "center"}}>
          <div style={{width: "200px" }}>
            <img src={cameraIcon} style={{width: "80px"}}></img>
            <p>Camera should work properly</p>
          </div>
          <div style={{width: "200px"}}>
            <img src={aloneIcon} style={{width: "80px"}}></img>
            <p>You should interact individually</p>
          </div>
          <div style={{width: "200px"}}>
            <img src={wholeIcon} style={{width: "80px"}}></img>
            <p>Entire body should be captured by camera</p>
          </div>
          <div style={{width: "200px"}}>
            <img src={clothesIcon} style={{width: "80px"}}></img>
            <p>Wear clothes that doesn't obscure your silhouette</p>
          </div>
        </div>
        <h2>Functions</h2>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", gap: "15px", textAlign: "center"}}>
          <div style={{width: "400px"}}>
            <img src={routineIcon} style={{width: "120px"}}></img>
            <h3>Yoga Routine</h3>
            <p>You can click the <a href="/YogaList">POSES</a> tab to find out different yoga poses, and make your own routine among them. You need to log-in to use this function.</p>
          </div>
          <div style={{width: "400px"}}>
            <img src={coachIcon} style={{width: "120px"}}></img>
            <h3>Yoga Coach</h3>
            <p>In the <a href="/">HOME</a> tab, press start. We offer easy and hard routines as default. After your whole body joints are captured, yoga coach starts!
            If your joints are similar to the correct pose by 15% error, it moves on to the next pose, and finally you can check your scores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
