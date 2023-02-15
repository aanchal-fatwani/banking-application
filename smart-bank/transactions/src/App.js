import React from "react";
import TransactionsList from "./views/TransactionsList";

export default function App({ userDetails }) {
  return (
    <div>
      <TransactionsList userDetails={userDetails} />
    </div>
  );
}
