import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import useScript from "../hooks/useScript";
import checkLogin from "../utils/checkLogin";

// axios.defaults.withCredentials = true;

const RoutinePage = () => {
  
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
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Routine Page</h1>
        <br />
      </div>
    </div>
  );
};

export default RoutinePage;
