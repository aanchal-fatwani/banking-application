import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const App = ({ navigate, userDetails, setUserDetails }) => {
  let customNavigate = navigate;
  if (!navigate) {
    customNavigate = useNavigate();
  }

  const [name, setName] = useState(
    (userDetails && userDetails.hasOwnProperty("name") && userDetails.name) ||
      (localStorage && localStorage.getItem("name"))
  );

  return (
    <div className="header">
      <h1 className="main-heading" onClick={() => customNavigate("/")}>
        SMART BANK
      </h1>
      <div style={{ left: "30px" }} className="header-section">
        {name && (
          <div
            className="header-tab"
            style={{ padding: "10px 20px", borderRadius: "5px" }}
          >{`HI  ${name} ..`}</div>
        )}
      </div>
      <div style={{ right: "7px" }} className="header-section">
        {name && (
          <>
            <button
              className="header-tab"
              onClick={() => customNavigate("/beneficiaries")}
            >
              Beneficiaries
            </button>
            <button
              className="header-tab"
              onClick={() => customNavigate("/transactions")}
            >
              Transactions
            </button>
          </>
        )}
        {
          <>
            <button
              className="header-tab"
              onClick={() => customNavigate("/help")}
            >
              Help
            </button>
            <button
              className="header-tab"
              onClick={() => customNavigate("/contact-us")}
            >
              Contact Us
            </button>
          </>
        }
        {name && (
          <button
            className="header-tab"
            onClick={() => {
              setUserDetails(null);
              localStorage.clear();
              document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              customNavigate("/auth/login");
            }}
          >
            {"Logout"}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
