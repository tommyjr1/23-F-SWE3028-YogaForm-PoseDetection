import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import yogaIcon from "../assets/yoga_icon.png";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";


const EndingPage = () => {
  const [routine, setRoutine] = useState('');
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [x, setX] = useState(false);
  const [imageFlag, setImageFlag] = useState(true);
  const [average, setAverage] = useState();
  const location = useLocation();

  const navigate = useNavigate();
  const goToRoutinePage = () => {
    navigate("/RoutinePage");
    // console.log("go to routine");
  };

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

  const saveResults = async () => {
    console.log("save");
    let allGrade = "";
    for (let i = 0; i< grades.length; i++){
      if (i > 0){
        allGrade += ","
      }
      allGrade = allGrade + grades[i];
    }

    console.log(allGrade);

    await axios
      .post("/user/addRecord", {
        routineName: routine,
        eachScore: allGrade,
        score: average
      },
      {
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRoutine = async (routine) => {
    // console.log(typeof userPoseAngle);
    console.log(routine);
    console.log(localStorage.getItem("token"));

    await axios
      .get(`/routine/${routine}`, {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        setImages(response.data.split(','));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYogaImage = async (name, index) => {

    console.log("getYogaImage function");
    console.log(name);

    try {
      const response = 
      await axios.get(`/pose/getImg/${name}`, {
        responseType: "arraybuffer",
        headers: { Accept: "*/*", "Content-Type": "image/png" },
      });
  
      const blob = new Blob([response.data], {
        type: "image/png",
      });
      const imgUrl = URL.createObjectURL(blob);
      // let copy = imgUrls;
      // copy.push(imgUrl);
      // setImgUrls(copy);
      if (index > imgUrls.length){
        setTimeout(function() { //Start the timer
          setImgUrls(prevList => [...prevList, imgUrl]);
        }.bind(this), 300)
      }else{
        setImgUrls(prevList => [...prevList, imgUrl]);
      }
    } catch (error) {
      console.log(error);
      // return null; // Or handle error as needed
    }
  };

  useEffect(() => {
    setRoutine("defaultEasy");

    if (checkLogin()){
      setX(true);
    }
    setGrades(location.state?.grade || []);
  }, []);

  useEffect(() => {
    // console.log(routine);
    getRoutine(routine);

  }, [routine]);

  useEffect(() => {
    let sum = 0;
    grades && grades.map((grade) => {
      console.log(typeof(grade));
      sum += grade;
    });
    setAverage(sum / grades.length);    
    
  }, [grades]);

  useEffect(() => {
    // console.log(routine);
    images && images.map((img, index) => {
      getYogaImage(img, index);
    })
    
  }, [images]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "1.4rem",
          alignItems: "center"
        }}
      >
        <div>
          <h1>Results</h1>
          <p>
            Routine : {`${routine}`}
          </p>
        </div>
        <div style={{ fontSize: "1.4rem", textAlign: "center"}}>
          <table>
            <thead>
              <tr>
                {images && images.map((image, index) => (
                  <th key={index} style={{paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>{image}</th>
                ))}
                <th style={{paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {imgUrls && imgUrls.map((imgUrl, index) => (
                  <td key={index}><img src={imgUrl} style={{width: "150px"}}/></td>
                ))}
                <td><img src={yogaIcon} style={{width: "150px"}}/></td>
              </tr>
              <tr>
              {/* (grades.length == images.length) && */}
                {grades &&  grades.map((grade, index) => (
                  <td key={index}>{grade}</td>
                ))}
                <td>{`${average}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          style={{
            position: "absolute",
            left: "80%",
            bottom: "10%",
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "100px",
            color: "#3B2C77",
            fontSize: "1.6rem",
          }}
          onClick={goToRoutinePage}
        >
          RESTART
        </button>
        <button
          style={{
            opacity: x ? 100 : 0,
            position: "absolute",
            left: "65%",
            bottom: "10%",
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "140px",
            color: "#3B2C77",
            fontSize: "1.6rem",
          }}
          onClick={saveResults}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EndingPage;
