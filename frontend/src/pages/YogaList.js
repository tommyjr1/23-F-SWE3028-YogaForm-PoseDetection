import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ConditionalHeader from '../components/ConditionalHeader';
import queryString from 'query-string'

const YogaList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  
  useEffect(() => {
    try{
      const { search } = location;
      const queryObj = queryString.parse(search);	
      const { isLogin } = queryObj;
      setIsLoggedIn((isLogin === 'true'));
    }catch{
      console.log("no");
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader isLoggedIn={isLoggedIn}></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <p>
            afsadjflakd
        </p>
      </div>
    </div>
  );
};

export default YogaList;
