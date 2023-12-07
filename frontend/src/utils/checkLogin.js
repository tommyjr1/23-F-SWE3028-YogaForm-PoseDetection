const checkLogin = () => !!localStorage.getItem("token");
export default checkLogin;