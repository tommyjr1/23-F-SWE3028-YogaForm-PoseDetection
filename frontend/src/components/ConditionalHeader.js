import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ConditionalHeader(props) {
  const navigate = useNavigate();
  const goToLogInPage = () => {
    stopWebCam();
    navigate("/LogInPage");
  };
  const goToMyPage = () => {
    stopWebCam();
    navigate("/MyPage");
    window.location.reload();
  };
  const goToYogaList = () => {
    stopWebCam();
    navigate("/YogaList");
  };
  const goToLandingPage = () => {
    stopWebCam();
    navigate("/");
  };
  const goToAboutPage = () => {
    stopWebCam();
    navigate("/AboutPage");
  };

  const stopWebCam = () => {
    try {
      const webcamRef = props.webcamRef;
      if (webcamRef.current.video) {
        let stream = webcamRef.current.video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        webcamRef.current.video.srcObject = null;
      }
    } catch {
      console.log("no camera usage");
    }
  };

  function UserHeader() {
    return (
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          justifyContent: "space-around",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>YOGA FORM</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Button
          variany="secondary"
          className="headerBtn"
          onClick={goToLandingPage}
        >
          HOME
        </Button>
        <Button variany="secondary" className="headerBtn" onClick={goToAboutPage}>
          ABOUT
        </Button>
        <Button variany="secondary" className="headerBtn" onClick={goToYogaList}>
          POSES
        </Button>
        <Button
          variany="secondary"
          className="loginBtn"
          onClick={goToMyPage}
        >
          My page
        </Button>
      </header>
    );
  }

  function GuestHeader() {
    return (
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          justifyContent: "space-around",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.8rem" }}>YOGA FORM</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Button
          variany="secondary"
          className="headerBtn"
          onClick={goToLandingPage}
        >
          HOME
        </Button>
        <Button variany="secondary" className="headerBtn" onClick={goToAboutPage}>
          ABOUT
        </Button>
        <Button variany="secondary" className="headerBtn" onClick={goToYogaList}>
          YOGA
        </Button>
        <Button
          variany="secondary"
          className="loginBtn"
          onClick={goToLogInPage}
        >
          Log-in
        </Button>
      </header>
    );
  }

  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserHeader />;
  } else {
    return <GuestHeader />;
  }
}
