import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";

// axios.defaults.withCredentials = true;

const RoutinePage = () => {
    const buttonStyle = {
    backgroundColor: "#282c34",
    border: "1px solid #282c34",
    borderRadius: "2rem",
    color: "antiquewhite",
    fontSize: "1.6rem",
    width: "150px",
    height: "60px",
    margin: "10px",
  };
  const [routines, setRoutines] = useState();
  const navigate = useNavigate();

  const selectRoutine = (routine) => {
    console.log("selected routine", routine);
    localStorage.setItem("routine", routine);
    navigate("/Instruction");
  };

  const getRoutines = async () => {
    // console.log(typeof userPoseAngle);

    if (checkLogin()) {
      await axios
        .get(`/routine/`, {
          responseType: "json",
          headers: {
            JWT: localStorage.getItem("token"),
            REFRESH: localStorage.getItem("refreshToken"),
          },
        })
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
          <button style={buttonStyle} onClick={()=>selectRoutine("defaultEasy")}>
            Easy
          </button>
          <button style={buttonStyle} onClick={()=>selectRoutine("defaultHard")}>
            Hard
          </button>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {checkLogin() && routines && (
          <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingInlineStart: "0px",
            marginLeft: "40px",
            marginRight: "40px",
          }}>
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
          </ul>
        )}
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;
