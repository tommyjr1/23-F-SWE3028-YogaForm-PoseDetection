import React, { useEffect, useState } from "react";
import yogaIcon from "../assets/yoga_icon.png";
import yogaImages from "../assets/yoga_images.png";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import YogaCoach from "./YogaCoach";
import Instruction from "./Instruction";
import LogInPage from "./LogInPage";
import MyPage from "./MyPage";
import ConditionalHeader from "../components/ConditionalHeader";
import queryString from "query-string";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
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
  const navigate = useNavigate();
  const goToInstrction = () => {
    if (isLoggedIn) {
      navigate("/Instruction?isLogin=true");
    } else {
      navigate("/Instruction");
    }
  };
  const goToEndingPage = () => {
    if (isLoggedIn) {
      navigate("/EndingPage?isLogin=true");
    } else {
      navigate("/EndingPage");
    }
  };

  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin } = queryObj;
      setIsLoggedIn(isLogin === "true");
    } catch {
      console.log("no");
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={isLoggedIn}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
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
            // onClick={goToInstrction}
            onClick={goToEndingPage}
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
