import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./remote_modules/header";

const Auth = lazy(() => import("./remote_modules/auth"));
const Dashboard = lazy(() => import("./remote_modules/dashboard"));
const Beneficiaries = lazy(() => import("./remote_modules/beneficiaries"));
const Transactions = lazy(() => import("./remote_modules/transactions"));

import Help from "./components/Help";
import ContactUs from "./components/ContactUs";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  let t = localStorage && localStorage.getItem("currentAccNum");
  let n = localStorage && localStorage.getItem("currentName");
  const [userDetails, setUserDetails] = useState({ accountNumber: t, name: n });

  return (
    <div style={{ backgroundColor: "rgb(227,227,227)", height: "100vh" }}>
      <Header userDetails={userDetails} setUserDetails={setUserDetails} />
      <div>
        <Suspense
          fallback={
            <div style={{ top: "50%", position: "absolute", left: "48%" }}>
              Loading...
            </div>
          }
        >
          <Routes>
            <Route
              path="/auth/*"
              element={
                <Auth
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                />
              }
            />
            <Route
              path="/beneficiaries"
              element={
                <ProtectedRoute>
                  <Beneficiaries userDetails={userDetails} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions userDetails={userDetails} />
                </ProtectedRoute>
              }
            />
            <Route path="/help" element={<Help userDetails={userDetails} />} />
            <Route
              path="/contact-us"
              element={<ContactUs userDetails={userDetails} />}
            />
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute>
                  <Dashboard userDetails={userDetails} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
