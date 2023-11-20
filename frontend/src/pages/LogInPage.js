import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LandingPage from './LandingPage';
import useScript from '../hooks/useScript';


const LogInPage = () => {  
    const [isLogin, setIsLogin] = useState("");

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

      const onGoogleLogIn = async res => {
        console.log(res);
        const { credential } = res;
        const result = await postLoginToken(credential, setIsLogin);
        setIsLogin(result);
      };

      const postLoginToken = async idToken => {
  
        await axios
        .post("http://3.35.60.125:8080/api/login",{
            credential: JSON.stringify(idToken)
        })
        .then((response)=>{
          console.log(response.data)
          navigate('/LandingPage');
        })
        .catch((error)=>{
          console.log(error);
        });
    };

    function GoogleLogin({
      onGoogleLogIn = () => {},
      text = 'signin_with',
    }) {
      const googleLogInButton = useRef(null);
    
      useScript('https://accounts.google.com/gsi/client', () => {
        window.google.accounts.id.initialize({
          client_id: "1022110957362-ncqd7ish7v0gabqmqah3a8dieikmeu6k.apps.googleusercontent.com",
          callback: onGoogleLogIn,
        });
    
        window.google.accounts.id.renderButton(
          googleLogInButton.current,
          { theme: 'filled_blue', size: 'large', text, width: '250' }, // customization attributes
        );
      });
    
      return <div ref={googleLogInButton}></div>;
    }

    // const postLoginToken = async idToken => {
    //     const API_URL = process.env.REACT_APP_API_URL;
    //     const path = "http://3.35.60.125:8080/api/login";
      
    //     try {
    //       const response = await fetch(`${API_URL}${path}`, {
    //         method: 'POST',
    //         credentials: 'include', // include, *same-origin, omit
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(idToken), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    //       });
    //       if (!response.ok) throw new Error('bad server condition');
    //       return true;
    //     } catch (e) {
    //       console.error('postLoginToken Error: ', e.message);
    //       return false;
    //     }
    //   };
    
    //   useEffect(() => {
    //     if (!isLogin) return;
    //     navigate('/Instruction');
    //   }, [isLogin]);

    // useEffect(() => {
    //     if (!isLogin) return;
    //     navigate('/Instruction');
    //   });

    return (
      <div className="App" style={bodyStyle}>
        <header style={{display: "flex", flexDirection: "row", paddingTop: "1rem",paddingBottom: "1rem", justifyContent:"space-around"}}><div style={{fontWeight: "bold", fontSize: "1.8rem"}}>YOGA FORM</div><div></div><div></div><div></div><div></div><div></div>
          <Button variany="secondary" style={buttonStyle}>HOME</Button><Button variany="secondary" style={buttonStyle}>ABOUT</Button><Button variany="secondary" style={buttonStyle}>YOGA</Button><Button variany="secondary" style={{backgroundColor: "#FFF2CC", border: "1px solid #FFF2CC",borderRadius: '2rem', width: "100px", color: "#3B2C77",fontSize: "1.6rem"}}>Log-in</Button></header>
        <hr style={{borderColor: "#3B2C77"}}/>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>Google Login</h1><br/>
            <GoogleLogin onGoogleLogIn={onGoogleLogIn} text="LogIn" />       
            {/* <a href="http://ec2-3-35-60-125.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/google" target="_blank" rel="noopener noreferrer">
              <div ref={googleSignInButton}></div>
              <Button>Log In</Button>
            </a>  */}
        </div>
    </div>
    );
};

export default LogInPage;