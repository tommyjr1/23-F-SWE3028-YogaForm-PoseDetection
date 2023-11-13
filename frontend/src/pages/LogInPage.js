import React from 'react';
import yogaIcon from '../assets/yoga_icon.png';
import yogaImages from '../assets/yoga_images.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import YogaCoach from './YogaCoach';
import Instruction from './Instruction';

const LogInPage = () => {  
    const bodyStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#F2CCFF",
        color: "#3B2C77"
      }
      const buttonStyle = {
        backgroundColor:"#F2CCFF", 
        border: "1px solid #F2CCFF",
        color: "#3B2C77",
        fontSize: "1.6rem"
      }
      const navigate = useNavigate();
      const goToInstrction = () => {
        navigate("/Instruction");
      }

    return (
      <div className="App" style={bodyStyle}>
        <header style={{display: "flex", flexDirection: "row", paddingTop: "1rem",paddingBottom: "1rem", justifyContent:"space-around"}}><div style={{fontWeight: "bold", fontSize: "1.8rem"}}>YOGA FORM</div><div></div><div></div><div></div><div></div><div></div>
          <Button variany="secondary" style={buttonStyle}>HOME</Button><Button variany="secondary" style={buttonStyle}>ABOUT</Button><Button variany="secondary" style={buttonStyle}>YOGA</Button><Button variany="secondary" style={{backgroundColor: "#FFF2CC", border: "1px solid #FFF2CC",borderRadius: '2rem', width: "100px", color: "#3B2C77",fontSize: "1.6rem"}}>Log-in</Button></header>
        <hr style={{borderColor: "#3B2C77"}}/>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <div>
            <p style={{fontSize: "2.6rem", marginTop:"7rem", marginBottom:"0rem"}}>Welcome to <strong>YOGA FORM!</strong></p>
            <p style={{fontSize: "1.8rem", marginTop:"0rem"}}>AI-based yoga pose correction</p><br/><br/><br/><br/>
            <Button variany="secondary" style={{position: "relative", bottom: "70px", width: "130px", height: "50px", backgroundColor:"#FFF2CC", border: "1px solid #FFF2CC",borderRadius: '2rem', fontSize: "1.7rem", color: "#3B2C77"}} onClick={goToInstrction}>
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

export default LogInPage;