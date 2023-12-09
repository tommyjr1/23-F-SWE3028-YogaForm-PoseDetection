import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";

// axios.defaults.withCredentials = true;

const RoutinePage = () => {
  const [routines, setRoutines] = useState();
  const navigate = useNavigate();
  
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
    backgroundColor: "#FFF2CC",
    border: "1px solid #FFF2CC",
    borderRadius: "2rem",
    color: "#3B2C77",
    fontSize: "1.6rem",
    width: "150px",
    height: "60px"
  };

  const selectRoutine = (routine) => {
    console.log("selected routine", routine);
    localStorage.setItem('routine', routine);
    navigate("/Instruction");
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

  useEffect(() => {
    getRoutines();    
  }, []);
  

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
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
          <button style={buttonStyle} onClick={() => selectRoutine("defaultEasy")}>
            Easy
          </button>
          <button style={buttonStyle} onClick={() => selectRoutine("defaultHard")}>
            Hard
          </button>
        </div>
        <br/>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px"
          }}>
          {checkLogin() && routines && (
          <>
            {routines.map((routine, index) => {
              if (index > 1) {
                return (
                  <button
                    key={index}
                    style={buttonStyle}
                    onClick={() => selectRoutine(routine)}
                  >
                    {`${routine}`}
                  </button>
                );
              } else {
                return null;
              }
            })}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;
