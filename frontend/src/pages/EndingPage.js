import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ConditionalHeader from "../components/ConditionalHeader";
import queryString from "query-string";
import { Bar } from 'react-chartjs-2';

const EndingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routine, setRoutine] = useState('');
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const location = useLocation();
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

  const getRoutine = async (routine) => {
    // console.log(typeof userPoseAngle);
    console.log(routine);

    await axios
      .get(`http://3.35.60.125:8080/yf/user/routine/${routine}`, {
        responseType: "json"
      })
      .then((response) => {
        setImages(response.data.split(','));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin, routine } = queryObj;
      setIsLoggedIn(isLogin === "true");
      setRoutine(routine);
    } catch {
      console.log("no");
      setIsLoggedIn(false);
    }
    getRoutine(routine);
    setGrades(location.state?.data || []);
  }, [location]);

  useEffect(() => {
    setData({
      labels: grades,
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
  
    setOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
    
  }, [grades]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader isLoggedIn={isLoggedIn}></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ paddingLeft: "40px" }}>Results</h1>
        <p style={{ fontSize: "1.4rem", paddingRight: "180px" }}>
          {" "}
          qqqqqqqqqqqqqqqqq
        </p>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default EndingPage;
