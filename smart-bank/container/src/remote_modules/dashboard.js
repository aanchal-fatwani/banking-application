import React, { useEffect, useRef } from "react";
import { mount } from "dashboard/DashboardComponent";

const Dashboard = ({ userDetails }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current, userDetails);
  }, []);

  return (
    <>
      <div
        ref={ref}
        style={{ 
          // height: "95%", 
          backgroundColor: "rgb(227,227,227)" }}
      ></div>
    </>
  );
};

export default Dashboard;
