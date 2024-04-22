import React from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import HomePage from "./components/HomePage/HomePage.jsx";
import SignIn from "./components/Header/SignIn/SignIn.jsx";
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
import SignUp from "./components/Header/SignUp/SignUp.jsx";
import SignUpSuccess from "./components/Header/SignUp/SignUpSuccess.jsx";
import Header from "./components/Header/Header.jsx";
import "./index.css";
import MobileHeader from "./components/Header/MobileHeader.jsx";
import InfoMobile from "./components/Account/Info/InfoMobile.jsx";
import SecurityMobile from "./components/Account/Security/SecurityMobile.jsx";
import { useAuth } from "./hooks/AuthContext"; 



function App() {
  const isDesktop = useMediaQuery("(min-width:600px)"); 
  const { isLoggedIn } = useAuth();


  return (
    <div className="app__wrapper">
      {isDesktop && (
        <div className="header__container">
          <Header />
        </div>
      )}
      <div className="content__container">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<SignUpSuccess />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/account" element={isDesktop ? <Info /> : <InfoMobile />} />
          <Route path="/security" element={isDesktop ? <Security /> : <SecurityMobile />} />
          <Route path="/license" element={<License />} />

          <Route path="/balance" element={<Balance />} />
          <Route path="/overhead" element={<Overhead />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/cashflow" element={<Cashflow />} />

          <Route path="/balance-analytics" element={<BalanceAnalytics />} />
          <Route path="/overhead-analytics" element={<OverheadAnalytics />} />
          <Route path="/cashflow-analytics" element={<CashflowAnalytics />} />
        </Routes>
      </div>
      {!isDesktop && isLoggedIn && (
        <div className="mobile-header__container">
          <MobileHeader />
        </div>
      )}
    </div>
  );
}

export default App;
