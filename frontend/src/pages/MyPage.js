import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";


const MyPage = () => {
  const [routines, setRoutines] = useState();
  const [record, setRecord] = useState();
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({ scales: { y: { beginAtZero: true } }, responsive: true,
    maintainAspectRatio: false,
    height: "400px", 
    width: "500px" });
  const navigate = useNavigate();

  ChartJS.register(...registerables);

  const [selected, setSelected] = useState("defaultEasy");

  const selectRoutine = (e) => {
    setSelected(e.target.value);
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const getRoutines = async () => {
    // console.log(typeof userPoseAngle);

    if (checkLogin()){
      await axios
      .get(`/routine/`, {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      }
      )
      .then((response) => {
        console.log(response.data);
        setRoutines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const getRecord = async (routine) => {

    await axios
      .get(`/user/secure/getRecord/${routine}`, {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        setRecord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getRoutines();

  }, []);

  useEffect(() => {
    if (record){
      setData(
        {
          labels: record.dates,
          datasets: [
            {
              label: 'Scores',
              data: record.scores,
              backgroundColor: '#282c34', // Bar color
              borderColor: '#282c34',
              borderWidth: 1,
            },
          ],
        }
      )
    }

  }, [record]);

  useEffect(() => {
    getRecord(selected);

  }, [selected]);

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      <h1>Results</h1><br/>
      
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <select onChange={selectRoutine} value={selected} style={{width: "150px"}}>
          {routines && routines.map((routine) => {
            return(
            <option value={routine} key={routine}>
              {routine}
            </option>
            );
          })}
        </select>
        <div style={{width: "1000px", height: "250px"}}>
        {record && (
          <>
            <p style={{ fontSize: "1.4rem" }}>
              Routine : {`${selected}`}
            </p>
            <Line data={data} options={options} />
          </>
        )}
        </div>
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
