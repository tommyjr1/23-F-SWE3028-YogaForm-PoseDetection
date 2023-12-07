import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConditionalHeader from "../components/ConditionalHeader";

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
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [yogaName, setYogaName] = useState("무희자세");
  const [x, setX] = useState(false);
  const [imgUrls, setImgurl] = useState([]);
  const [poseName, setPoseName] = useState([]);

  const getPoseName = async () => {
    await axios
      .get("http://3.35.60.125:8080/yf/pose/getName")
      .then((res) => {
        //poseNames = res.data;
        // res.data.forEach(item => {
        //   poseNames.push(item);
        // });
        setPoseName(res.data);
        poseName.forEach((item) => {
          getImage(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //setInterval(()=>console.log(imgUrls), 3000);
    console.log(imgUrls.length);
    console.log(imgUrls);
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
        //imgUrls.push(imgUrl);
        // setImgurl(imgUrls.concat([imgUrl]));
        let copy = imgUrls;
        console.log(copy);
        //console.log(copy.length);
        //let input = copy.push(imgUrl);
        //console.log(input);
        setImgurl(copy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin } = queryObj;
      setIsLoggedIn(isLogin === "true");
      getPoseName();
    } catch {
      console.log("no");
      setIsLoggedIn(false);
    }
  }, []);

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
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {poseName.map((pose, index) => {
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
          })}
        </ul>
      </div>
    </div>
  );
};

export default YogaList;
