import axios from "axios";
import queryString from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import { create } from "lodash";


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

  const [x, setX] = useState(false);
  const [imgUrls, setImgurl] = useState([]);
  const [poseName, setPoseName] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

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

    console.log(value, e.target.checked);
  };

  const getPoseName = async () => {
    await axios
      .get("/pose/getName")
      .then((res) => {
        //poseNames = res.data;
        // res.data.forEach(item => {
        //   poseNames.push(item);
        // });
        setPoseName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    // console.log("checkedList: ", checkedList);
    e.preventDefault();
    console.log("checkedList: ", checkedList);
  };

  const getImage = async (name) => {
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
        //imgUrls.push(imgUrl);
        // setImgurl(imgUrls.concat([imgUrl]));
        let copy = imgUrls;
        console.log(copy);
        //console.log(copy.length);
        //let input = copy.push(imgUrl);
        //console.log(input);
        // setImgurl(copy);
        setImgurl((prevList) => [prevList, imgUrl]);
        console.log(imgUrls);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { search } = location;
        const queryObj = queryString.parse(search);
        const { isLogin } = queryObj;
        setIsLoggedIn(isLogin === "true");
        const poseNames = await getPoseName();
        console.log(poseName); //왜빈배열???
        const imagePromises = Array.from(poseNames).map((item) =>
          getImage(item)
        );
        await Promise.all(imagePromises);
        //console.log(imgUrls2);
      } catch (e) {
        console.log("Error: ", e);
        setIsLoggedIn(false);
      }
    };

    fetch();
  }, []);

  const poseList = poseName.map((pose, index) => {
    //console.log(imgUrls);
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

  const checkPoseList = poseName.map((pose, index) => {
    //console.log(imgUrls);
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
        <form onSubmit={onSubmit}>
          <div className="poseTitle">
            {/* <h6>{pose}</h6> */}
            <input
              type="checkbox"
              id={pose}
              checked={checkedList.includes(pose)}
              onChange={(e) => checkHandler(e, pose)}
            />
            <label htmlFor={pose}>{pose}</label>
          </div>
        </form>
      </li>
    );
  });

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader 
        isLoggedIn={isLoggedIn}
      ></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        className="poseDisplay"
        style={{
          verticalAlign: "top",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ paddingLeft: "40px" }}>Standing</h1>
        <button
          style={{
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "120px",
            height: "40px",
            color: "#3B2C77",
            fontSize: "1rem",
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          Make a routine
        </button>
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {/* {poseList} */}
          {checkPoseList}
        </ul>
        <button
          style={{
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "120px",
            height: "40px",
            color: "#3B2C77",
            fontSize: "1rem",
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default YogaList;
