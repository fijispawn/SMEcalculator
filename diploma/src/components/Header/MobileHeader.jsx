import React from "react";
import { useLocation } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Header.css";

const MobileHeader = () => {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div>
      <div className="mobile__header">
        <Link to="/balance">
          <div className={`flex flex-col items-center gap-2.5 ${isActive('/balance') ? 'active' : ''}`}>
            <FiActivity color={isActive('/balance') ? '#fd7770' : 'inherit'} />
            Показатели
          </div>
        </Link>
        <Link to="/balance-analytics">
          <div className={`flex flex-col items-center gap-2.5 ${isActive('/balance-analytics') ? 'active' : ''}`}>
            <SiGoogleanalytics color={isActive('/balance-analytics') ? '#fd7770' : 'inherit'} />
            Аналитика
          </div>
        </Link>
        <Link to="/account">
          <div className={`flex flex-col items-center gap-2.5 ${isActive('/account') ? 'active' : ''}`}>
            <MdManageAccounts color={isActive('/account') ? '#fd7770' : 'inherit'} />
            Аккаунт
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
