import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const YogaList = () => {
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
  const goToLandingPage = () => {
    navigate("/LandingPage");
  };
  const goToInstrction = () => {
    navigate("/Instruction");
  };
  const goToLogInPage = () => {
    navigate("/LogInPage");
  };
  const goToYogaList = () => {
    navigate("/YogaList");
  };

  return (
    <div className="App" style={bodyStyle}>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          justifyContent: "space-around",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>YOGA FORM</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Button variany="secondary" style={buttonStyle} onClick={goToLandingPage}>
          HOME
        </Button>
        <Button variany="secondary" style={buttonStyle}>
          ABOUT
        </Button>
        <Button variany="secondary" style={buttonStyle} onClick={goToYogaList}>
          YOGA
        </Button>
        <Button
          variany="secondary"
          style={{
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "100px",
            color: "#3B2C77",
            fontSize: "1.6rem",
          }}
          onClick={goToLogInPage}
        >
          Log-in
        </Button>
      </header>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <p>
            afsadjflakd
        </p>
      </div>
    </div>
  );
};

export default YogaList;
