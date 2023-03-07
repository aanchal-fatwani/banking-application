import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./views/Dashboard";

const mount = (el, userDetails) => {
  const root = createRoot(el);
  root.render(<Dashboard userDetails={userDetails} />);
};

if (!window.containerContext) mount(document.getElementById("root"));

export { mount };
