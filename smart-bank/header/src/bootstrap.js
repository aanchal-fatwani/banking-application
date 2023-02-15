import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const mount = (el, navigate, userDetails, setUserDetails) => {
  console.log("in Head");
  console.log(userDetails);
  const root = createRoot(el);

  root.render(
    <BrowserRouter>
      <App
        navigate={navigate}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    </BrowserRouter>
  );
};

if (!window.containerContext) {
  mount(document.getElementById("root"));
}

export { mount };
