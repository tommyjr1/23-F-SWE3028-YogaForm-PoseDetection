import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import useScript from "../hooks/useScript";
import checkLogin from "../utils/checkLogin";

// axios.defaults.withCredentials = true;

const LogInPage = () => {
  const navigate = useNavigate();

  const onGoogleLogIn = async (res) => {
    console.log(res.credential);
    await postLoginToken(res.credential);
  };

  const postLoginToken = async (idToken) => {
    await axios
      .post("/user/login", {
        credential: JSON.stringify(idToken),
      })
      .then(response => {
        console.log(response.headers)
        localStorage.clear();
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log(localStorage.getItem('token'));
        }
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
          console.log(localStorage.getItem('refreshToken'));
        }
        navigate("/");
      }) 
      .catch((error) => {
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
        { theme: "filled_white", size: "large", text, width: "250" } // customization attributes
      );
    });

    return <div ref={googleLogInButton}></div>;
  }

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
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
