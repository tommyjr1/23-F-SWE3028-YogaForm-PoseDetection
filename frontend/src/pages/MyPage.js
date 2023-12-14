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
  const [imgUrls, setImgUrls] = useState([]);
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [modal, setModal] = useState(false);
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

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
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

  const getRoutine = async (routine) => {
    // console.log(typeof userPoseAngle);
    console.log(routine);

    if (checkLogin()) {
      await axios
        .get(`/routine/${routine}`, {
          responseType: "json",
          headers: {
            JWT: localStorage.getItem("token"),
            REFRESH: localStorage.getItem("refreshToken"),
          },
        })
        .then((response) => {
          setImages(response.data.split(","));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getYogaImage = async (name, index) => {
    console.log("getYogaImage function");
    console.log(name);

    try {
      const response = await axios
      .get(`/pose/getImg/${name}`, {
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
      if (index > imgUrls.length) {
        setTimeout(
          function () {
            //Start the timer
            setImgUrls((prevList) => [...prevList, imgUrl]);
          }.bind(this),
          300
        );
      } else {
        setImgUrls((prevList) => [...prevList, imgUrl]);
      }
    } catch (error) {
      console.log(error);
      // return null; // Or handle error as needed
    }
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
    getRoutine(selected);

  }, [selected]);

  useEffect(() => {
    // console.log(routine);
    // images &&
    //   images.map((img, index) => {
    //     getYogaImage(img, index);
    //   });
    setImgUrls([]);
  }, [images]);

  useEffect(() => {
    // console.log(routine);
    (imgUrls.length == 0) && images &&
      images.map((img, index) => {
        getYogaImage(img, index);
      });
  }, [imgUrls]);

  return (
    <div className="App">
      <ConditionalHeader 
        isLoggedIn={checkLogin()}
      ></ConditionalHeader>
      <hr/>
      <h1>Results</h1><br/>
      
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "row", gap: "3px"}}>
          <select className="myPageSelect" onChange={selectRoutine} value={selected} style={{width: "150px"}}>
            {routines && routines.map((routine) => {
              return(
              <option value={routine} key={routine}>
                {routine}
              </option>
              );
            })}
          </select>
          <button className="modalOpenBtn" onClick={openModal}>See Poses</button>
        </div>
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
        {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2> Routine : {`${selected}`}</h2>
              <div style={{display: "flex", flexDirection: "row", gap: "3px"}}>
                {images && imgUrls && images.map((image, index) => {
                    return(
                      <div>
                        <p>{`${image}`}</p>
                        <img src={imgUrls[index]} style={{ width: "150px" }} />
                      </div>
                    );
                  })}
                </div>
                <br/>
              <button className="modalBtn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
