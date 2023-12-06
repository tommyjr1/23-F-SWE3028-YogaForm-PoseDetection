import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useTable } from 'react-table';
import axios from "axios";
import ConditionalHeader from "../components/ConditionalHeader";
import queryString from "query-string";

const EndingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routine, setRoutine] = useState('');
  const [images, setImages] = useState([]);
  const [grades, setGrades] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [x, setX] = useState(false);
  const [columnData, setColumnData] = useState();
  const [columns, setColumns] = useState();
  const [bodyData, setBodyData] = useState();
  const [data, setData] = useState();
  const location = useLocation();
  const [getTableProps, setGetTableProps] = useState();
  const [getTableBodyProps, setGetTableBodyProps] = useState();
  const [headerGroups, setHeaderGroups] = useState();
  const [rows, setRows] = useState();
  

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

  const saveResults = () => {
    console.log("save");
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

  const getYogaImage = async (name) => {

    console.log("getYogaImage function");

    // await axios
    //   .get(`http://3.35.60.125:8080/yf/pose/getImg/${name}`, {
    //     responseType: "arraybuffer",
    //     headers: { Accept: "*/*", "Content-Type": "image/png" },
    //   })
    //   .then((response) => {
    //     console.log('get image');
    //     const blob = new Blob([response.data], {
    //       type: "image/png",
    //     });
    //     const imgUrl = URL.createObjectURL(blob);
    //     return (imgUrl);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      const response = await axios.get(`http://3.35.60.125:8080/yf/pose/getImg/${name}`, {
        responseType: "arraybuffer",
        headers: { Accept: "*/*", "Content-Type": "image/png" },
      });
  
      const blob = new Blob([response.data], {
        type: "image/png",
      });
      const imgUrl = URL.createObjectURL(blob);
      console.log(name);
      let copy = imgUrls;
      copy.push(imgUrl);
      setImgUrls(copy);
    } catch (error) {
      console.log(error);
      // return null; // Or handle error as needed
    }
  };
  
  // const {
  //   a, //table props
  //   b, //table body props
  //   c, //header
  //   d, //row
  //   prepareRow } =
  // useTable({ columns, data });

  // setGetTableProps(a);
  // setGetTableBodyProps(b);
  // setHeaderGroups(c);
  // setRows(d);

  useEffect(() => {
    try {
      const { search } = location;
      const queryObj = queryString.parse(search);
      const { isLogin, userRoutine } = queryObj;
      setIsLoggedIn(isLogin === "true");
      setRoutine(userRoutine);
      console.log(userRoutine);
    } catch {
      console.log("no");
      setIsLoggedIn(false);
    }

    if (isLoggedIn){
      setX(true);
    }
    // setGrades(location.state?.data || []);
    // console.log(location.state?.data || []);
    setGrades([98, 79]);
  }, [location]);

  useEffect(() => {
    // console.log(routine);
    getRoutine(routine);
    
  }, [routine]);

  useEffect(() => {
    // console.log(routine);
    images && images.map((img) => {
      getYogaImage(img);
    })
    
  }, [images]);

  // useEffect(() => {
  //   if (images.length !== 0 && grades.length !== 0){
  //     const headerColumns = images.map((image) => ({
  //       accessor: image,
  //       Header: image, // Set the header name as the image name
  //     }));

  //     setColumnData([...headerColumns]);    

  //   }
    
  // }, [images, grades]);

  // useMemo(() => {
  //   if (columnData) {
  //     setColumns(columnData);
  //   }
  // }, [columnData]);

  // useEffect(() => {
  //   if (images.length !== 0 && grades.length !== 0) {
  //     const imageData = images.map((image) => ({
  //       image: getYogaImage(image) || 0,
  //     }));
  
  //     const gradeData = images.map((image, index) => ({
  //       image: grades[index] || 0,
  //     }));
  
  //     setBodyData([imageData, gradeData]);
  //   }
  // }, [images, grades]);

  // useMemo(() => {
  //   if (bodyData) {
  //     setData(bodyData);
  //   }
  // }, [bodyData]);

  return (
    <div className="App" style={bodyStyle}>
      <ConditionalHeader isLoggedIn={isLoggedIn}></ConditionalHeader>
      <hr style={{ borderColor: "#3B2C77" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ paddingLeft: "40px" }}>Results</h1>
          <p style={{ fontSize: "1.4rem", paddingLeft: "40px" }}>
            Routine : {`${routine}`}
          </p>
        </div>
        <div style={{ fontSize: "1.4rem", paddingRight: "180px" }}>
          {/* <table {...getTableProps}>
            <thead>
              {headerGroups && headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers && headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows && rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells && row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          <table>
            <thead>
              <tr>
                {images && images.map((image, index) => (
                  <th key={image}>{image}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* {images && images.map((image, index) => (
                  <td key={index}><img src={getYogaImage(image)}/></td>
                ))} */}
                {imgUrls && imgUrls.map((imgUrl, index) => (
                  <td key={index}><img src={imgUrl} style={{width: "100px"}}/></td>
                  // <td key={index}>{imgUrl}</td>
                ))}
              </tr>
              <tr>
                {grades && grades.map((grade, index) => (
                  <td key={index}>{grade}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          style={{
            opacity: x ? 100 : 0,
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
          onClick={saveResults}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default EndingPage;
