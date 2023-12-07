import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState, Children } from "react";
import { useLocation } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";
import { create } from "lodash";
import { setLabels } from "react-chartjs-2/dist/utils";

const YogaList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const bodyStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
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
  // let imgUrls2 = [];
  const [poseName, setPoseName] = useState([]);

  const getPoseName = async () => {
    await axios
      .get("http://3.35.60.125:8080/yf/pose/getName")
      .then((res) => {
        setPoseName(res.data);
        //setPoseName(prevList => [prevList, res.data]);
        // const data = res.data;
        // setPoseName(data);
        // return data;
      })
      .catch((err) => {
        console.log(err);
        // return [];
      });
    // poseName.forEach((item) => {
    //   getImage(item);
    // });
  };

  const getImage = async (name) => {
    await axios
      .get(`http://3.35.60.125:8080/yf/pose/getImg/${name}`, {
        responseType: "arraybuffer",
        headers: { Accept: "*/*", "Content-Type": "image/png" },
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "image/png",
        });
        const imgUrl = URL.createObjectURL(blob);
        // let copy = Array.from(imgUrls);
        // copy.push(imgUrl);
        // console.log(imgUrl);
        // setImgurl(copy);
        // console.log(copy.length);
        // imgUrls2.push(imgUrl);
        setImgurl(prevList => [prevList, imgUrl]);
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
        console.log(poseName); //이거왜빈배열???
        const imagePromises = Array.from(poseNames).map((item) => getImage(item));
        await Promise.all(imagePromises);
        //console.log(imgUrls2);
      } catch(error) {
        console.log("Error: ", error);
        setIsLoggedIn(false);
      }
      
    };
    fetch();
  }, []);

  const poseList= poseName.map((pose, index) => {
    // console.log(pose);
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

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader isLoggedIn={isLoggedIn}></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        className="poseDisplay"
        style={{
          verticalAlign: "top",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ paddingLeft: "40px" }}>Standing</h1>
        <button style={{
            backgroundColor: "#FFF2CC",
            border: "1px solid #FFF2CC",
            borderRadius: "2rem",
            width: "120px",
            height: "40px",
            color: "#3B2C77",
            fontSize: "1rem",
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end"
          }}
          
          >Make a routine</button>
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {poseList}
        </ul>
      </div>
    </div>
  );
};

export default YogaList;
