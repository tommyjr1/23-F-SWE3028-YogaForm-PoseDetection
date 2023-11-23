import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LandingPage from './LandingPage';
import useScript from '../hooks/useScript';


const MyPage = () => {

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

      

    return (
      <div className="App" style={bodyStyle}>
        <header style={{display: "flex", flexDirection: "row", paddingTop: "1rem",paddingBottom: "1rem", justifyContent:"space-around"}}><div style={{fontWeight: "bold", fontSize: "1.8rem"}}>YOGA FORM</div><div></div><div></div><div></div><div></div><div></div>
          <Button variany="secondary" style={buttonStyle}>HOME</Button><Button variany="secondary" style={buttonStyle}>ABOUT</Button><Button variany="secondary" style={buttonStyle}>YOGA</Button><Button variany="secondary" style={{backgroundColor: "#FFF2CC", border: "1px solid #FFF2CC",borderRadius: '2rem', width: "100px", color: "#3B2C77",fontSize: "1.6rem"}}>Log-in</Button></header>
        <hr style={{borderColor: "#3B2C77"}}/>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>My page</h1><br/>    
        </div>
    </div>
    );
};

export default MyPage;