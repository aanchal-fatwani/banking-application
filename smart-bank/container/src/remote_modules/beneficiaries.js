import React, { useEffect, useRef } from "react";
import { mount } from "beneficiaries/BeneficiariesComponent";

const Beneficiaries = ({ userDetails }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current, userDetails);
  }, []);

  return (
    <>
      <div ref={ref} style={{ height: "100%" }}></div>
    </>
  );
};

export default Beneficiaries;
