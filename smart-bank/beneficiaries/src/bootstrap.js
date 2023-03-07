import React from "react";
import { createRoot } from "react-dom/client";
import BeneficiariesList from "./views/BeneficiariesList";

const mount = (el, userDetails) => {
  const root = createRoot(el);
  root.render(<BeneficiariesList userDetails={userDetails} />);
};

if (!window.containerContext) mount(document.getElementById("root"));

export { mount };
