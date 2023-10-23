import React from 'react';
import yogaIcon from '../assets/yoga_icon.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const LandingPage = () => {  
    const bodyStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // backgroundColor: "#DADDB1",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
      }
    return (
        <div className="App" style={bodyStyle}>
      <div style={{}}>
        <h1 style={{fontSize: "4.5rem"}}>WELCOME,<br></br> to YOGA FORM</h1>
        <Button variany="secondary" style={{width: "40%", height: "40%", minWidth: '2rem'}}>
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