import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as mediapipePose from "@mediapipe/pose";
import { Pose } from "@mediapipe/pose";
import axios from "axios";
import { throttle } from "lodash";
import queryString from "query-string";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import yogaImage from "../assets/yoga_image.gif";
import ConditionalHeader from "../components/ConditionalHeader";


const YogaCoach = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [routine, setRoutine] = useState("defaultEasy");
  const [routine, setRoutine] = useState("");
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
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  let camera = null;
  // const [userPoseAngle, setUserPoseAngle] = use
  let userPoseAngle = null;

  const [audio, setAudio] = useState();
  const [landmarks, setLandmarks] = useState();
  // const [first, setFirst] = useState(true);
  const [index, setIndex] = useState(0);
  const [pass, setPass] = useState(false);
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [imageUrl, setImageUrl] = useState(yogaImage);
  const [yogaName, setYogaName] = useState('무희자세');
  const [x, setX] = useState(false);
  const [timer1, setTimer1] = useState();
  const [timer2, setTimer2] = useState();
  const [lastExecution, setLastExecution] = useState(0);

  const navigate = useNavigate();
  const goToLogInPage = () => {
    stopWebCam();
    navigate("/LogInPage");
  };
  const goToYogaList = () => {
    stopWebCam();
    navigate("/YogaList");
  };

  async function onResults(results) {
    // let landmarks = results.poseLandmarks; // * all the landmarks in the pose
    setLandmarks(results.poseLandmarks);
    // console.log(results.poseLandmarks);
    // submitLandmarkData(landmarks);
    // requestAudioFile();

    //  * getting the values for the three landmarks that we want to use
    // try {
    //   // * we get errors every time the landmarks are not available
    //   // * will provide dynamic landmarks later "landmarks[mediapipePose.POSE_LANDMARKS.{landmark}]"
    //   let leftShoulder = await landmarks[mediapipePose.POSE_LANDMARKS.LEFT_SHOULDER];
    //   let leftElbow = await landmarks[mediapipePose.POSE_LANDMARKS.LEFT_ELBOW];
    //   let leftWrist = await landmarks[mediapipePose.POSE_LANDMARKS.LEFT_WRIST];
    //   // console.log(leftWrist);
    //   // calculatePoseAngle(leftWrist, leftElbow, leftShoulder);
    // } catch (error) {
    //   // console.error(error);
    // }
    // Define the canvas element dimensions using the earlier created refs
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    drawConnectors(
      canvasCtx,
      results.poseLandmarks,
      mediapipePose.POSE_CONNECTIONS,
      { color: "white", lineWidth: 1 }
    );
    // * The dots are the landmarks
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "red",
      lineWidth: 1,
      radius: 2,
    });
    canvasCtx.restore();
  }

  const calculatePoseAngle = async (a, b, c) => {
    // Calculate the dot product and the magnitudes of the vectors
    let dot_product = await ((b.x - a.x) * (b.x - c.x) +
      (b.y - a.y) * (b.y - c.y) +
      (b.z - a.z) * (b.z - c.z));
    let point_1_2_mag = await Math.sqrt(
      Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2)
    );
    let point_2_3_mag = await Math.sqrt(
      Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2) + Math.pow(b.z - c.z, 2)
    );

    // Calculate the angle between the left hand, elbow, and shoulder landmarks in degrees
    let angle = await (Math.acos(
      dot_product / (point_1_2_mag * point_2_3_mag)
    ) *
      (180 / Math.PI));

    userPoseAngle = angle.toFixed(2);
    console.log(userPoseAngle);
    if (userPoseAngle != null) {
      // submitAngleData();
      // checkAngle();
    }
  };

  const submitLandmarkData = async (currentLandmarks, currentImages, currentIndex) => {
    // console.log(typeof userPoseAngle);
    console.log("submit landmark");
    console.log(currentImages);

    await axios
      .post("/coach/angle", {
        value: JSON.stringify(currentLandmarks),
      },
      {
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data){
          // console.log(images);
          requestAudioFile(currentImages, currentIndex);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const requestAudioFile = async (currentImages, currentIndex) => {

    console.log("request audio");
    const name = currentImages[currentIndex];
    const flagAudio = false;

    await axios
      .get(`/coach/feedback/${name}`, {
        responseType: "arraybuffer",
        headers: { 
          Accept: "*/*", 
          "Content-Type": "audio/wav",
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        },
      })
      .then((response) => {
        console.log(response.data);
        // const currentTime = Date.now();
        if (response.data && response.data.byteLength !== 0){
          console.log("yes audio");
          // console.log("current:",currentTime);
          // console.log("last",lastExecution);
          const blob = new Blob([response.data], {
            type: "audio/wav",
          });
          const url = URL.createObjectURL(blob);
          setAudio(url);
          // flagAudio = true;
          // setLastExecution(currentTime);

          // var audio_bell = document.getElementById("tts");

          // audio_bell.oncanplaythrough = function () {
          //   // This event is fired when the browser can play the audio without stopping for buffering
          //   audio_bell.play();
          // };

          checkPass(currentImages, currentIndex);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    
    // if (flagAudio){
    //   var audio_bell = document.getElementById("tts");

    //   audio_bell.oncanplaythrough = function () {
    //     // This event is fired when the browser can play the audio without stopping for buffering
    //     audio_bell.play();
    //   };

    //   checkPass(currentImages, currentIndex);
    // }
  };

  // const playAudio = async (currentImages, currentIndex) => {

  //   console.log("play audio");
  //   var audio_bell = document.getElementById("tts");
  //   audio_bell.oncanplaythrough = function () {
  //     audio_bell.play();
  //   };
  //   checkPass(currentImages, currentIndex);
  // };

  const getRoutine = async (routine) => {
    // console.log(typeof userPoseAngle);
    console.log(routine);

    await axios
      .get(`/routine/${routine}`, {
        responseType: "json",
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      }
      )
      .then((response) => {
        // console.log(response.data);
        // images = response.data.split(',');
        setImages(response.data.split(','));
        // setGrades(Array(response.data.split(',').length).fill(0))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYogaImage = async (name) => {
    // console.log(typeof userPoseAngle);
    console.log("getYogaImage function");

    await axios
      .get(`/pose/getImg/${name}`, {
        responseType: "arraybuffer",
        headers: { 
          Accept: "*/*", 
          "Content-Type": "image/png",
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        },
      })
      .then((response) => {
        console.log('get image');
        const blob = new Blob([response.data], {
          type: "image/png",
        });
        const imgUrl = URL.createObjectURL(blob);

        setImageUrl(imgUrl);
        setYogaName(name);
      })
      .catch((error) => {
        console.log(error);
      });

      // setX(true);
  };

  const checkPass = async (currentImages, currentIndex) => {
    // console.log(images);

    const name = currentImages[currentIndex];
    await axios
      .get(`/coach/pass/${name}`,
      {
        headers:{
          JWT: localStorage.getItem("token"),
          REFRESH: localStorage.getItem("refreshToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        if (response.data >= 0){
          // const updatedGrades = [...grades]; // Create a copy of the grades array
          // const updatedGrades = grades.concat(response.data); // Update the value at index 0 to 96
          // setGrades(updatedGrades);
          setGrades(prevList => [...prevList, parseFloat(response.data)]);
          setIndex(currentIndex + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // function AudioPlayer({ audio }) {
  //   return (
  //     <audio id="tts" controls ref={audioRef} src={audio} preload="auto" />
  //   );
  // }

  const stopWebCam = () => {
    if (webcamRef.current.video) {
      let stream = webcamRef.current.video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      webcamRef.current.video.srcObject = null;
    }
  };

  // const debouncedSubmitLandmarkData = useCallback(
  //   debounce((currentLandmarks) => {
  //     submitLandmarkData(currentLandmarks);
  //   }, 1000),
  //   []
  // );
  const throttleSubmitLandmarkData = useCallback(
    throttle((currentLandmarks, currentImages, currentIndex) => {
      submitLandmarkData(currentLandmarks, currentImages, currentIndex);
    }, 1000),
    []
  );

  useEffect(() => {

    // setTimer1(setInterval(() => throttleSubmitLandmarkData(landmarks, images, index), 1000));
    // setTimer2(setInterval(() => throttleRequestAudio(images, index), 1000));
    throttleSubmitLandmarkData(landmarks, images, index);

  }, [images, landmarks, index]);

  useEffect(() => {
    console.log("again");
    const userPose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    userPose.setOptions({
      selfieMode: true,
      modelComplexity: 0,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    userPose.onResults(onResults);
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current &&
      webcamRef.current.video
    ) {
      // console.log(webcamRef.current.video);
      camera = new cam.Camera(webcamRef.current.video, {
        // no issues with the exaustive-deps. We do not need to store the camera object for current purposes
        onFrame: async () => {
          await userPose.send({ image: webcamRef.current.video });
        },
        // width: 1280,
        // height: 720,
        width: 600,
        height: 400,
      });
      camera.start();
    }
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin, userRoutine } = queryObj;
      setIsLoggedIn(isLogin === "true");
      setRoutine(userRoutine);
    } catch {
      setIsLoggedIn(false);
    }
    // getRoutine(routine);

    // const timer = setInterval(() => throttleSubmitLandmarkData(landmarks), 1000);
    // const timer2 = setInterval(() => playAudio(currentImages, currentIndex), 10000);

    // return () => {
    //   clearInterval(timer1);
    //   // clearInterval(timer2);
    // };

  }, [location.pathname]);

  useEffect(() => {
    // console.log(routine);
    getRoutine(routine);
    
  }, [routine]);

  useEffect(() => {
    console.log("grade : ", grades);
    let gradeFlag = 1;
    if (grades.length !== 0 && grades.length == images.length){
      for (let i=0; i< grades.length; i++){
        console.log(grades[i]);
        if (grades[i] === 0){
          // console.log(grades[i]);
          gradeFlag = 0;
          break;
        }
      }
    }else{
      gradeFlag = 0;
      console.log("length zero");
    }
    if (gradeFlag === 1){
      console.log("stop webcam");
      stopWebCam();
      if (isLoggedIn) {
        setTimeout(function() { //Start the timer
          navigate(`/EndingPage?isLogin=true&userRoutine=${routine}`, { state: { grade: grades } }); //After 1 second, set render to true
        }.bind(this), 2000)
      } else {
        setTimeout(function() { //Start the timer
          navigate(`/EndingPage?isLogin=false&userRoutine=${routine}`, { state: { grade: grades } }); //After 1 second, set render to true
        }.bind(this), 2000)
      }
    }
    
  }, [grades]);

  useEffect(() => {
    // Perform action when images or index change
    console.log(images);
    if (images.length > 0 && index < images.length) {
      // Do something with images[index]
      getYogaImage(images[index]);
    }

    if (index !== 0 && index >= images.length){
      setX(true);
    }
  }, [images, index]);

  useEffect(() => {
    // Play audio when 'audio' state is updated
    if (audio && audioRef.current) {
      if (index < images.length){
        audioRef.current.src = audio; // Set the audio source

        const isAudioInDOM = document.body.contains(audioRef.current);
        if (isAudioInDOM) {
          audioRef.current.play(); // Play the audio
        } else {
          console.log('Audio element is not in the DOM');
          // Handle the case where the audio element is not in the DOM
        }
        // audioRef.current.play(); // Play the audio
      }
    }
  }, [audio, audioRef]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader
        isLoggedIn={isLoggedIn}
        webcamRef={webcamRef}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: 200,
            left: 0,
            right: 700,
            zindex: 9,
          }}
        >
          <img id="yogaImg" src={imageUrl} style={{ height: "20rem" }}></img>
        </div>
        <div>
          <div
            style={{
              width: "600px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              padding: "1.5rem",
              position: "relative",
              left: "40%",
            }}
          >
            <p id="yogaName">{yogaName}</p>
          </div>
          {/* type="audio/mpeg" */}
          {/* <AudioPlayer {...{ audio }} /> */}
          <audio id="tts" controls ref={audioRef} src={audio} preload="auto" />
          {/* <audio id="tts" controls ref={audioRef} src={audio} />; */}
          {/* <AudioPlayer src={audio} ref={audioRef} autoPlay={true}/> */}

          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 500,
              right: 0,
              zindex: 9,
              width: 600,
              height: 400,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 500,
              right: 0,
              zindex: 9,
              width: 600,
              height: 400,
            }}
          ></canvas>
        </div>
        {/* <button
        style={{
          opacity: x ? 100 : 0,
          // opacity: 100,
          position: "absolute",
          left: "80%",
          bottom: "10%",
          backgroundColor: "#FFF2CC",
          border: "1px solid #FFF2CC",
          borderRadius: "2rem",
          width: "150px",
          height: "50px",
          color: "#3B2C77",
          fontSize: "1.6rem",
        }}
        onClick={goToEndingPage}
      >
        RESULTS
      </button> */}
      </div>
    </div>
  );
};

export default YogaCoach;