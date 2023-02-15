import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const mount = (el, userDetails) => {
  console.log("in Txn");
  console.log(userDetails);
  const root = ReactDOM.createRoot(el);
  root.render(<App userDetails={userDetails}/>);
};

if (!window.containerContext) mount(document.getElementById("root"));

export { mount };
