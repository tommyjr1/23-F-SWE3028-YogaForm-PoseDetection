import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import yogaIcon from "../assets/yoga_icon.png";


const RoutinePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routine, setRoutine] = useState('');
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [x, setX] = useState(false);
  const [imageFlag, setImageFlag] = useState(true);
  const [average, setAverage] = useState();
  const location = useLocation();  

  const navigate = useNavigate();
  const goToYogaCoach = () => {
    navigate("/YogaCoach");
  };

  const bodyStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#F2CCFF",
    color: "#3B2C77",
  };
  const buttonStyle = {
    backgroundColor: "#F2CCFF",
    border: "1px solid #F2CCFF",
    color: "#3B2C77",
    fontSize: "1.6rem",
  };

  

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={isLoggedIn}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "1.4rem",
          alignItems: "center"
        }}
      >
        <div>
          <h1>Results</h1>
          <p>
            Routine : {`${routine}`}
          </p>
        </div>
        <div style={{ fontSize: "1.4rem", textAlign: "center"}}>
          <table>
            <thead>
              <tr>
                {images && images.map((image, index) => (
                  <th key={index} style={{paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>{image}</th>
                ))}
                <th style={{paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {imgUrls && imgUrls.map((imgUrl, index) => (
                  <td key={index}><img src={imgUrl} style={{width: "150px"}}/></td>
                ))}
                <td><img src={yogaIcon} style={{width: "150px"}}/></td>
              </tr>
              <tr>
              {/* (grades.length == images.length) && */}
                {grades &&  grades.map((grade, index) => (
                  <td key={index}>{grade}</td>
                ))}
                <td>{`${average}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          style={{
            opacity: x ? 100 : 0,
            // opacity: 100,
            position: "absolute",
            left: "80%",
            bottom: "10%",
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "100px",
            color: "#3B2C77",
            fontSize: "1.6rem",
          }}
          onClick={saveResults}
        >
          SAVE
        </button>
        <button
          style={{
            opacity: 100,
            position: "absolute",
            left: "65%",
            bottom: "10%",
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "140px",
            color: "#3B2C77",
            fontSize: "1.6rem",
          }}
          onClick={goToRoutinePage}
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export default RoutinePage;
