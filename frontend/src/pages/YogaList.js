import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import checkLogin from "../utils/checkLogin";

const YogaList = () => {
  const location = useLocation();

  const [imgUrls, setImgurl] = useState([]);
  const [poseName, setPoseName] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [routineName, setRoutineName] = useState("Untitled");
  const [isOn, setIsOn] = useState(false);
  const [x, setX] = useState(false);

  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };

  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const imagePaths = [
    "../postures/BirdOfParadiseRevolved_R.png",
    "../postures/Chair.png",
    "../postures/ChairTwistBindUp_L.png",
    "../postures/CrescentMoon_R.png",
    "../postures/Eagle_R.png",
    "../postures/Goddess_L.png",
    "../postures/HalfMoon_L.png",
    "../postures/LordOfTheDance_L.png",
    "../postures/LungeCrescent_L.png",
    "../postures/MountainArmsSide.png",
    "../postures/PyramidPrayer_L.png",
    "../postures/ShivaSquat_L.png",
    "../postures/StandingFootBehindHead_R.png",
    "../postures/StandingHandToToeExtended_L.png",
    "../postures/StandingHandToToeFull_L.png",
    "../postures/StandingHandToToeRevolved_L.png",
    "../postures/Star_L.png",
    "../postures/TriangleForward_L.png",
    "../postures/TrivikramaI_L.png",
    "../postures/WarriorIIForwardArmForward_L.png",
    "../postures/WarriorIKneeling_L.png",
  ];

  const getPoseName = async () => {
    await axios
      .get("/pose/getName")
      .then((res) => {
        setPoseName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    if (checkedList.length == 0) {
      alert("Choose poses.");
      e.preventDefault();
    } else if (routineName === "Untitled") {
      alert("Input a routine name");
      e.preventDefault();
    } else {
      console.log("checkedList: ", checkedList);
      setIsOn(false);
      alert("New routine is successfully created!");

      await axios
        .post(
          "/routine/secure/addRoutine",
          {
            routineName: routineName,
            poses: checkedList,
          },
          {
            headers: {
              JWT: localStorage.getItem("token"),
              REFRESH: localStorage.getItem("refreshToken"),
            },
          }
        )
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getImage = async (name, index) => {
    await axios
      .get(`/pose/getImg/${name}`, {
        responseType: "arraybuffer",
        headers: { Accept: "*/*", "Content-Type": "image/png" },
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "image/png",
        });
        const imgUrl = URL.createObjectURL(blob);

        // setImgurl((prevList) => [prevList, imgUrl]);
        // console.log(imgUrls);
        if (index > imgUrls.length) {
          setTimeout(
            function () {
              //Start the timer
              setImgurl((prevList) => [...prevList, imgUrl]);
            }.bind(this),
            300
          );
        } else {
          setImgurl((prevList) => [...prevList, imgUrl]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      getPoseName();
      setImgurl(imagePaths);
    } catch (e) {
      console.log("Error: ", e);
    }
    // console.log(poseName);
    // poseName &&
    //   poseName.map((img, index) => {
    //     getImage(img, index);
    //   });
  }, []);

  const PoseList = poseName.map((pose, index) => {
    return (
      <li
        style={{
          textAlign: "match-parent",
          listStyle: "none",
          margin: "10px",
        }}
        key={pose}
      >
        <div>
          <img
            id={pose}
            src={imgUrls[index]}
            style={{
              overflowClipMargin: "content-box",
              overflow: "clip",
              objectFit: "cover",
              width: "150px",
            }}
          ></img>
        </div>
        <div className="poseTitle">
          <h6>{pose}</h6>
        </div>
      </li>
    );
  });

  const SelectPose = poseName.map((pose, index) => {
    return (
      <li
        style={{
          textAlign: "match-parent",
          listStyle: "none",
          margin: "10px",
        }}
        key={pose}
      >
        <div>
          <img
            id={pose}
            src={imgUrls[index]}
            style={{
              overflowClipMargin: "content-box",
              overflow: "clip",
              objectFit: "cover",
              width: "150px",
            }}
          ></img>
        </div>
        <div className="poseTitle">
          <input
            type="checkbox"
            id={pose}
            checked={checkedList.includes(pose)}
            onChange={(e) => checkHandler(e, pose)}
          />

          <label htmlFor={pose} style={{ fontSize: "0.6em" }}>
            {pose}
          </label>
        </div>
      </li>
    );
  });

  const onChange = (e) => {
    setRoutineName(e.target.value);
  };

  return (
    <div className="App">
      <ConditionalHeader isLoggedIn={checkLogin()}></ConditionalHeader>
      <hr />
      <div
        className="poseDisplay"
        style={{
          verticalAlign: "top",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: "30px" }}>
          {checkLogin() && !isOn ? (
            <button className="yogaListBtn" onClick={() => setIsOn(true)}>
              Make a routine
            </button>
          ) : (
            <></>
          )}
          {isOn ? (
            <input
              placeholder="Routine Name"
              onChange={onChange}
              style={{ width: "200px", height: "25px", fontSize: "1.5em" }}
            ></input>
          ) : (
            <></>
          )}
        </div>

        <form onSubmit={onSubmit}>
          <h1
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "100px",
            }}
          >
            Standing Poses
          </h1>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              paddingInlineStart: "0px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            {isOn ? SelectPose : PoseList}
          </ul>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            {isOn ? (
              <button className="yogaListBtn" type="submit">
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default YogaList;
