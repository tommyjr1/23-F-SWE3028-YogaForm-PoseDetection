import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import yogaImages from "../assets/yoga_images.png";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";

const LandingPage = () => {
  const navigate = useNavigate();
  const goToInstrction = () => {
    navigate("/Instruction");
  };
  const goToEndingPage = () => {
    navigate("/EndingPage");
  };
  const goToRoutinePage = () => {
    navigate("/RoutinePage");
  };


  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "2.6rem",
              marginTop: "7rem",
              marginBottom: "0rem",
            }}
          >
            Welcome to <strong>YOGA FORM!</strong>
          </p>
          <p style={{ fontSize: "1.8rem", marginTop: "0rem" }}>
            AI-based yoga pose correction
          </p>
          <br />
          <br />
          <br />
          <br />
          <Button
            variany="secondary"
            className="startBtn"
            style={{
              position: "relative",
              bottom: "70px",
              width: "130px",
              height: "50px",
              backgroundColor: "#FFF2CC",
              border: "1px solid #FFF2CC",
              borderRadius: "2rem",
              fontSize: "1.7rem",
              color: "#3B2C77",
            }}
            onClick={goToRoutinePage}
          >
            START
          </Button>
        </div>
        <div>
          <img src={yogaImages}></img>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
