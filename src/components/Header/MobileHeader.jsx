import React from "react";
import { useLocation } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Header.css";

const MobileHeader = () => {
  const location = useLocation();

  const isActive = (pathArray) => {
    return pathArray.some(path => location.pathname === path || location.pathname.startsWith(path + '/'));
  };

  return (
    <div>
      <div className="mobile__header">
        <Link to="/balance">
          <div className={`flex flex-col items-center w-[80px] ${isActive(['/balance', '/overhead', '/budget', '/cashflow']) ? 'active' : ''}`}>
            <FiActivity color={isActive(['/balance', '/overhead', '/budget', '/cashflow']) ? '#fd7770' : 'inherit'} />
            Показатели
          </div>
        </Link>
        <Link to="/balance-analytics">
          <div className={`flex flex-col items-center w-[80px] ${isActive(['/balance-analytics', '/cashflow-analytics', '/overhead-analytics']) ? 'active' : ''}`}>
            <SiGoogleanalytics color={isActive(['/balance-analytics', '/cashflow-analytics', '/overhead-analytics']) ? '#fd7770' : 'inherit'} />
            Аналитика
          </div>
        </Link>
        <Link to="/account">
          <div className={`flex flex-col items-center w-[80px] ${isActive(['/account', '/security', '/license']) ? 'active' : ''}`}>
            <MdManageAccounts color={isActive(['/account', '/security', '/license']) ? '#fd7770' : 'inherit'} />
            Аккаунт
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
