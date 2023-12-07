const checkLoginRefresh = () => !!localStorage.getItem("refreshToken");
export default checkLoginRefresh;