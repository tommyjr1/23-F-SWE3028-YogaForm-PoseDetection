import axios from "axios";

const refreshToken = async (func) => {
  await axios
    .post(`/user/reissue`, {
    },
      {headers:{
        JWT: localStorage.getItem("token"),
        REFRESH: localStorage.getItem("refreshToken")
      }}
    )
    .then((response) => {
      console.log("new token: "+response.data);
      console.log(response.headers);
      localStorage.setItem("token", response.headers["jwt"]).then(func);

    })
    .catch((error) => {
      console.log(error.response.headers);
    });
  };export default refreshToken;