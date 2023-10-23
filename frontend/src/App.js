import yogaIcon from './yoga_icon.png';
import yogaImage from './yoga_image.gif';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './App.css';
import Webcam from "react-webcam";

import YogaCoach from './pages/YogaCoach';

function App() {
  // const bodyStyle = {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  //   // backgroundColor: "#DADDB1",
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   height: "100%"
  // }

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
}

export default App;
