import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import useScript from "../hooks/useScript";
import ConditionalHeader from '../components/ConditionalHeader';

const LogInPage = () => {
  const isLoggedIn = false;
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
  const goToYogaList = () => {
    navigate("/YogaList")
  }
  const goToLandingPage = () => {
    navigate("/LandingPage");
  };
  const goToLogInPage = () => {
    navigate("/LogInPage");
  };

  const onGoogleLogIn = async (res) => {
    console.log(res.credential);
    await postLoginToken(res.credential);
  };

  const postLoginToken = async idToken => {

    await axios
    .post("http://3.35.60.125:8080/yf/user/login",{
      credential: JSON.stringify(idToken)
    })
    .then((response)=>{
      // console.log(response.data)
      navigate('/?isLogin=true');
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  function GoogleLogin({ onGoogleLogIn = () => {}, text = "signin_with" }) {
    const googleLogInButton = useRef(null);

    useScript("https://accounts.google.com/gsi/client", () => {
      window.google.accounts.id.initialize({
        client_id:
          "1022110957362-ncqd7ish7v0gabqmqah3a8dieikmeu6k.apps.googleusercontent.com",
        callback: onGoogleLogIn,
      });

      window.google.accounts.id.renderButton(
        googleLogInButton.current,
        { theme: "filled_blue", size: "large", text, width: "250" } // customization attributes
      );
    });

    return <div ref={googleLogInButton}></div>;
  }

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader isLoggedIn={isLoggedIn}></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Google Login</h1>
        <br />
        <GoogleLogin onGoogleLogIn={onGoogleLogIn} text="LogIn" />
      </div>
    </div>
  );
};

export default LogInPage;
