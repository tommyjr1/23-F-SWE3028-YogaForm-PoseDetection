import React from 'react';
import yogaIcon from '../assets/yoga_icon.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const YogaCoach = () => {  
    const buttonStyle = {
      width: "40%", 
      height: "40%", 
      minWidth: '2rem', 
      borderWidth: '0.25rem', 
      fontSize : '1rem',
      fontWeight: 'bold'
    }
    return (
        <div className="App">
        {/* <div>
          <h1 style={{fontSize: "4.5rem"}}>WELCOME,<br></br> to YOGA FORM</h1>
          <Button variany="secondary" style={buttonStyle}>
            Start!
          </Button>
        </div>
        <div>
          <img src={yogaIcon}></img>
        </div> */}
        <h1>
          Let's do the yoga together!
        </h1>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <div style={{}}>
          <Webcam />
          </div>
          <div style={{alignContent: "center"}}>
            <img src={yogaImage} style={{height: "20rem"}}></img>
            <p>무희자세</p>
            <p>...infromation of the posture...</p>
          </div>
        </div>
      </div>
    );
};

export default YogaCoach;