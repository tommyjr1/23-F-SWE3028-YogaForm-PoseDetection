import React from 'react';
import yogaIcon from '../assets/yoga_icon.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Instruction from './Instruction';

const LandingPage = () => {  
    const bodyStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#F2CCFF",
        color: "#3B2C77",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
      }
      const navigate = useNavigate();
      const goToInstruction = () => {
        navigate("/Instruction");
      }

    return (
        <div className="App" style={bodyStyle}>
      <div style={{}}>
        <h1 style={{fontSize: "4.5rem"}}>WELCOME,<br></br> to YOGA FORM</h1>
        <Button variany="secondary" style={{width: "40%", height: "40%", minWidth: '2rem'}} onClick={goToInstruction}>
          Start!
        </Button>
      </div>
      <div>
        <img src={yogaIcon}></img>
      </div>
    </div>
    );
};

export default LandingPage;