import React, { useEffect, useRef } from "react";
import { mount } from "transactions/TransactionsComponent";

const Transactions = ({userDetails}) => {
  const ref = useRef(null);
console.log("in Transactions");
  useEffect(() => {
    mount(ref.current, userDetails);
  }, []);

  return (
    <>
      <div ref={ref} style={{ height: "100%" }}></div>
    </>
  );
};

export default Transactions;
