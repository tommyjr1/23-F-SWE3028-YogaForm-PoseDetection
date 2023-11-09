import yogaIcon from './assets/yoga_icon.png';
import yogaImage from './assets/yoga_image.gif';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './App.css';
import Webcam from "react-webcam";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instruction from './pages/Instruction';
import YogaCoach from './pages/YogaCoach';
import Instruction from './pages/Instruction';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<LandingPage />} />
        {/* <Instruction /> */}
        <Route path="/Instruction" element={<Instruction />} />
        {/* <YogaCoach /> */}
        <Route path="/YogaCoach" element={<YogaCoach />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
