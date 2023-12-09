import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";

// axios.defaults.withCredentials = true;

const RoutinePage = () => {
  const [routines, setRoutines] = useState();
  const navigate = useNavigate();

  const selectRoutine = (routine) => {
    console.log("selected routine", routine);
    localStorage.setItem('routine', routine);
    navigate("/Instruction");
  };

  function RoutineButtons() {
    if (checkLogin()){
      console.log(routines);
      return (
        routines && routines.map((routine, index) => {
          if (index > 1){
            <button className="routineBtn" onClick={selectRoutine(routine)}>
              {`${routine}`}
            </button>
          }
        })
      );
    }else{
      return(
        <br/>
      );
    }
  }

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
        // console.log(response.data);
        setRoutines(response.data.split(','));
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  // useEffect(() => {
    
  // }, [routines]);

  useEffect(() => {
    getRoutines();    
  }, []);
  

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <h1>Select Routine</h1>
        <br />
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px"
          }}>
          <button className="routineBtn" onClick={selectRoutine("defaultEasy")}>
            Easy
          </button>
          <button className="routineBtn" onClick={selectRoutine("defaultHard")}>
            Hard
          </button>
        </div>
        <br/>
        <RoutineButtons></RoutineButtons>
      </div>
    </div>
  );
};

export default RoutinePage;
