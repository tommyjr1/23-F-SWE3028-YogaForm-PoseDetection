import React from 'react';
import yogaIcon from '../assets/yoga_icon.png';
import yogaImages from '../assets/yoga_images.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import YogaCoach from './YogaCoach';
=======
>>>>>>> 593268817b7ba9ff140be0d7ac4d2f238f89148e
import Instruction from './Instruction';

const LandingPage = () => {  
    const bodyStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#F2CCFF",
<<<<<<< HEAD
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
=======
        color: "#3B2C77",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
      }
      const navigate = useNavigate();
      const goToInstruction = () => {
>>>>>>> 593268817b7ba9ff140be0d7ac4d2f238f89148e
        navigate("/Instruction");
      }

    return (
<<<<<<< HEAD
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
=======
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
>>>>>>> 593268817b7ba9ff140be0d7ac4d2f238f89148e
    </div>
    );
};

export default LandingPage;