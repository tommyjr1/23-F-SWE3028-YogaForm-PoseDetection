import yogaIcon from './yoga_icon.png';
import yogaImage from './yoga_image.gif';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './App.css';
import Webcam from "react-webcam";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import YogaCoach from './pages/YogaCoach';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<LandingPage />} />
        {/* <YogaCoach /> */}
        <Route path="/YogaCoach" element={<YogaCoach />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
