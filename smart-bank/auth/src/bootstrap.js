import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

let root;
const mount = (el, navigate, location, setUserDetails, userDetails) => {
  console.log("in Auth");
  console.log(userDetails);
  root = createRoot(el);
  root.render(
    <div id="authRoot">
      <BrowserRouter>
        <App
          navigate={navigate}
          location={location}
          setUserDetails={setUserDetails}
        />
      </BrowserRouter>
    </div>
  );
};

const render = (navigate, location, setUserDetails, userDetails) => {
  console.log("in Auth");
  console.log(userDetails);
  root.render(
    <div id="authRoot">
      <BrowserRouter>
        <App
          navigate={navigate}
          location={location}
          setUserDetails={setUserDetails}
        />
      </BrowserRouter>
    </div>
  );
};

if (!window.containerContext) {
  mount(document.getElementById("root"));
}

export { mount, render };
