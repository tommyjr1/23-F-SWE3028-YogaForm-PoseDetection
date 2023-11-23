import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogInPage from '../pages/LogInPage';
import MyPage from '../pages/MyPage';
import YogaList from '../pages/YogaList';
import queryString from 'query-string'

export default function ConditionalHeader(props) {

    const buttonStyle = {
        backgroundColor: "#F2CCFF",
        border: "1px solid #F2CCFF",
        color: "#3B2C77",
        fontSize: "1.6rem"
    }
    const navigate = useNavigate();
    const goToLogInPage = () => {
        stopWebCam();
        navigate("/LogInPage");
    }
    const goToMyPage = () => {
        stopWebCam();
        navigate("/MyPage");
    }
    const goToYogaList = () => {
        stopWebCam();
        if (isLoggedIn) {
            navigate("/YogaList?isLogin=true");
        } else {
            navigate("/YogaList");
        }
    }
    const goToLandingPage = () => {
        stopWebCam();
        if (isLoggedIn) {
            navigate("/?isLogin=true");
        } else {
            navigate("/");
        }
    }

    const stopWebCam = () => {
        try{
            const webcamRef = props.webcamRef;
            if (webcamRef.current.video) {
                let stream = webcamRef.current.video.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                webcamRef.current.video.srcObject = null;
            }
        }catch{
            console.log("no camera usage");
        }
    };

    function UserHeader() {
        return <header style={{ display: "flex", flexDirection: "row", paddingTop: "1rem", paddingBottom: "1rem", justifyContent: "space-around" }}><div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>YOGA FORM</div><div></div><div></div><div></div><div></div><div></div>
            <Button variany="secondary" style={buttonStyle} onClick={goToLandingPage}>HOME</Button><Button variany="secondary" style={buttonStyle}>ABOUT</Button><Button variany="secondary" style={buttonStyle} onClick={goToYogaList}>YOGA</Button><Button variany="secondary" style={{ backgroundColor: "#FFF2CC", border: "1px solid #FFF2CC", borderRadius: '2rem', width: "120px", color: "#3B2C77", fontSize: "1.6rem" }} onClick={goToMyPage}>My page</Button></header>;
    }

    function GuestHeader() {
        return <header style={{ display: "flex", flexDirection: "row", paddingTop: "1rem", paddingBottom: "1rem", justifyContent: "space-around" }}><div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>YOGA FORM</div><div></div><div></div><div></div><div></div><div></div>
            <Button variany="secondary" style={buttonStyle} onClick={goToLandingPage}>HOME</Button><Button variany="secondary" style={buttonStyle}>ABOUT</Button><Button variany="secondary" style={buttonStyle} onClick={goToYogaList}>YOGA</Button><Button variany="secondary" style={{ backgroundColor: "#FFF2CC", border: "1px solid #FFF2CC", borderRadius: '2rem', width: "100px", color: "#3B2C77", fontSize: "1.6rem" }} onClick={goToLogInPage}>Log-in</Button></header>;
    }

  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserHeader />;
  } else {
    return <GuestHeader />;
  }
}
