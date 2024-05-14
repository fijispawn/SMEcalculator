import React from 'react';
import { Link } from "react-router-dom";
import '../../Indicators/Indicators.css'

const AnalyticsTabs = ({ activeTab }) => {
  return (
    <div className="tab__container">
      <Link to="/balance-analytics" className={`tab ${activeTab === 'balance-analytics' ? 'tab__main' : 'tab'}`}>
        Баланс
      </Link>
      <Link to="/overhead-analytics" className={`tab ${activeTab === 'overhead-analytics' ? 'tab__main' : 'tab'}`}>
        Накладные расходы
      </Link>
      <Link to="/budget-analytics" className={`tab ${activeTab === 'budget-analytics' ? 'tab__main' : 'tab'}`}>
        Бюджет
      </Link>
      <Link to="/cashflow-analytics" className={`tab ${activeTab === 'cashflow-analytics' ? 'tab__main' : ''}`}>
        Движение средств
      </Link>
    </div>
  );
};

export default AnalyticsTabs;
