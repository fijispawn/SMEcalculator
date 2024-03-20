import React from "react";
import "../Indicators.css";
import NavigationTabs from '../IndicatorsWrapper/NavigationTabs.jsx';
import {IndicatorsWrapper} from "../IndicatorsWrapper/IndicatorsWrapper.jsx";

const Cashflow = () => {
  return (
    <IndicatorsWrapper activeTab="cashflow">
      <div>Cashflow</div>
    </IndicatorsWrapper>
  );
};

export default Cashflow;
