import React, {useState} from "react";
import "./App.css";
import Webcam from "react-webcam";
import { useRef, useEffect } from "react";
import * as mediapipePose from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { Button } from 'react-bootstrap';
//import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
//import silhouette from "./assets/pngwing.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  let userPoseAngle = null;
  const[x, setX] = useState(false);
  const[msg, setMsg] = useState("Stand so that your entire body is visible on the camera."); 

  function onResults(results) {
    let landmarks = results.poseLandmarks; // * all the landmarks in the pose

    //  * getting the values for the three landmarks that we want to use
    try {
      // * we get errors every time the landmarks are not available
      // * will provide dynamic landmarks later "landmarks[mediapipePose.POSE_LANDMARKS.{landmark}]"
      let nose = landmarks[mediapipePose.POSE_LANDMARKS.NOSE];
      let leftWrist = landmarks[mediapipePose.POSE_LANDMARKS.LEFT_WRIST];
      let rightWrist = landmarks[mediapipePose.POSE_LANDMARKS.RIGHT_WRIST];
      //let leftFoot = landmarks[mediapipePose.POSE_LANDMARKS.LEFT_FOOT_INDEX];
      //let rightFoot = landmarks[mediapipePose.POSE_LANDMARKS.RIGHT_FOOT_INDEX];
      checkVisibility(nose, leftWrist, rightWrist);
    } catch (error) {
      //console.error(error);
    }
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
    // drawConnectors(
    //   canvasCtx,
    //   results.poseLandmarks,
    //   mediapipePose.POSE_CONNECTIONS,
    //   { color: "white", lineWidth: 1 }
    // );
    // // * The dots are the landmarks
    // drawLandmarks(canvasCtx, results.poseLandmarks, {
    //   color: "red",
    //   lineWidth: 1,
    //   radius: 2,
    // });
    canvasCtx.restore();
  }
  useEffect(() => {
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
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        // no issues with the exaustive-deps. We do not need to store the camera object for current purposes
        onFrame: async () => {
          await userPose.send({ image: webcamRef.current.video });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, []);

  const checkVisibility = (a, b, c) => {
    if (
      (a.visibility > 0.5) &
      (b.visibility > 0.5) &
      (c.visibility > 0.5) //&
      //(d.visibility > 0.5) &
      //(e.visibility > 0.5)
    ) {
      setX(true);
      setMsg("Great");
    }
  };

  return (
    <div className="App">
      <h1>Instruction</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            zindex: 9,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            zindex: 9,
          }}
        ></canvas>
      </div>
      <p style={{ marginTop: 500 }}> {`${msg}`}</p>
      <button style={{ opacity:x ? 100:0 }}>Next</button>
    </div>
  );
}

export default App;
