import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useLocation } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";


const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routine, setRoutine] = useState('');
  const [routines, setRoutines] = useState([]);
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({ scales: { y: { beginAtZero: true } } });
  const [x, setX] = useState(false);
  const location = useLocation();

  ChartJS.register(...registerables);

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

  const saveResults = () => {
    console.log("save");
  };

  const getUserRoutine = async () => {

    await axios
      .get("/routine", {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        setRoutines(response.data.split(','));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin, userRoutine } = queryObj;
      setIsLoggedIn(isLogin === "true");
      setRoutine("defaultEasy");
      console.log(userRoutine);
    } catch {
      console.log("no");
      setIsLoggedIn(false);
    }

    if (isLoggedIn){
      setX(true);
    }

    getUserRoutine();
    // setGrades(location.state?.grade || []);
    setGrades([98, 79]);
  }, [location]);


  useEffect(() => {
    if (images.length !== 0 && grades.length !== 0){
      setData({
        labels: images,
        datasets: [
          {
            label: 'Grades',
            data: grades,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
    
  }, [images, grades]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={isLoggedIn}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ paddingLeft: "40px" }}>Results</h1><br/>
          <p style={{ fontSize: "1.4rem", paddingLeft: "40px" }}>
            Routine : {`${routine}`}
          </p>
        </div>
        <div style={{ fontSize: "1.4rem", paddingRight: "180px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
