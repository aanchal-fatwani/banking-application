import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import Login from "./Login";

const App = ({ navigate, location, setUserDetails }) => {
  let customNavigate = navigate;
  if (!navigate) {
    customNavigate = useNavigate();
  }

  let customLocation = location;
  if (!location) {
    customLocation = useLocation();
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontSize: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route
            path="/auth/login"
            element={
              <Login
                customNavigate={customNavigate}
                setUserDetails={setUserDetails}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
