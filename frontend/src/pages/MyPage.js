import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";


const MyPage = () => {
  const [routine, setRoutine] = useState('');
  const [records, setRecords] = useState();
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({ scales: { y: { beginAtZero: true } }, responsive: true,
    maintainAspectRatio: false,
    height: "400px", 
    width: "500px" });
  const navigate = useNavigate();

  ChartJS.register(...registerables);

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const getRecord = async () => {

    await axios
      .get("/user/secure/getRecord", {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    getRecord();
    // setGrades(location.state?.grade || []);
    setGrades([98, 79]);
  }, []);

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      <h1>Results</h1><br/>
      
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {checkLogin() && records && (
          <>
            {records.map((record, index) => {
              console.log(record);
              const lineData = {
                labels: record.dates,
                datasets: [
                  {
                    label: 'Scores',
                    data: record.scores,
                    backgroundColor: '#FFF2CC', // Bar color
                    borderColor: '#FFF2CC',
                    borderWidth: 1,
                  },
                ],
              };
              return (
                <div style={{width: "1000px", height: "300px"}}>
                  <p style={{ fontSize: "1.4rem"}}>
                    Routine : {`${record.routineName}`}
                  </p>
                  <Line data={lineData} options={options} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <br/>
      <button
          className="logoutBtn"
          onClick={LogOut}
        >
          LogOut
        </button>
    </div>
  );
};

export default MyPage;
