import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import "./index.css";
import SignIn from "./components/Header/SignIn/SignIn.jsx";

import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./components/Account/Info/Info.jsx";
import Balance from "./components/Indicators/Balance/Balance.jsx";
import Overhead from "./components/Indicators/Overhead/Overhead.jsx";
import Budget from "./components/Indicators/Budget/Budget.jsx";
import Cashflow from "./components/Indicators/Cashflow/Cashflow.jsx";
import Security from "./components/Account/Security/Security.jsx";
import License from "./components/Account/License/License.jsx";
import BalanceAnalytics from "./components/Analytics/BalanceAnalytics.jsx";
import CashflowAnalytics from "./components/Analytics/CashflowAnalytics.jsx";
import OverheadAnalytics from "./components/Analytics/OverheadAnalytics.jsx";
import SignUp from "././components/Header/SignUp/SignUp.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import Header from "./components/Header/Header.jsx";
import SignUpSuccess from "./components/Header/SignUp/SignUpSuccess.jsx";
import HeaderIn from "./components/Header/HeaderIn.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <div className="app__wrapper">
          <div className="header__container">
            <Header />
            {/* <HeaderIn/> */}
          </div>
          <div className="content__container">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/success" element={<SignUpSuccess />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<HomePage />} />

              <Route path="/account" element={<Info />} />
              <Route path="/security" element={<Security />} />
              <Route path="/license" element={<License />} />

              <Route path="/balance" element={<Balance />} />
              <Route path="/overhead" element={<Overhead />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/cashflow" element={<Cashflow />} />
              <Route path="/balance-analytics" element={<BalanceAnalytics />} />
              <Route
                path="/overhead-analytics"
                element={<OverheadAnalytics />}
              />
              <Route
                path="/cashflow-analytics"
                element={<CashflowAnalytics />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
