import React from 'react';
import { Link } from "react-router-dom";
import '../Indicators.css'

const NavigationTabs = ({ activeTab }) => {
  return (
    <div className="tab__container">
      <Link to="/balance" className={`tab ${activeTab === 'balance' ? 'tab__main' : 'tab'}`}>
        Баланс
      </Link>
      <Link to="/overhead" className={`tab ${activeTab === 'overhead' ? 'tab__main' : 'tab'}`}>
        Накладные расходы
      </Link>
      <Link to="/budget" className={`tab ${activeTab === 'budget' ? 'tab__main' : ''}`}>
        Операционный бюджет
      </Link>
      <Link to="/cashflow" className={`tab ${activeTab === 'cashflow' ? 'tab__main' : ''}`}>
        Движение средств
      </Link>
    </div>
  );
};

export default NavigationTabs;
