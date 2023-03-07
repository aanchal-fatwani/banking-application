import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!getCookie("username")) {
    localStorage.clear();
  }

  const checkUserToken = () => {
    const userToken = localStorage.getItem("currentAccNum");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/auth/login");
    }
    setIsLoggedIn(true);
  };
  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }
  useEffect(() => {
    checkUserToken();
  }, []);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
