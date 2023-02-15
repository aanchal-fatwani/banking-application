import React from "react";
import { createRoot } from "react-dom/client";
import BeneficiariesList from "./views/BeneficiariesList";

const mount = (el, userDetails) => {
  console.log("in Bene");
  console.log(userDetails);
  const root = createRoot(el);
  root.render(
      <BeneficiariesList/>
  );
};

if (!window.containerContext) mount(document.getElementById("root"));

export { mount };
