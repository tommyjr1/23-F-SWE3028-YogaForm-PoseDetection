import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Instruction from './pages/Instruction';
import YogaCoach from './pages/YogaCoach';
import YogaList from './pages/YogaList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        {/* <Instruction /> */}
        <Route path="/Instruction" element={<Instruction />} />
        {/* <YogaCoach /> */}
        <Route path="/YogaCoach" element={<YogaCoach />} />
        {/* <YogaList /> */}
        <Route path="/YogaList" element={<YogaList />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
