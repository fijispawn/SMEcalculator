import React from "react";
import { SiGoogleanalytics } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Header.css";

const MobileHeader = () => {
  return (
    <div>
      <div className="mobile__header">
        <Link to="/balance">
          <div className="flex flex-col items-center gap-2.5">
            <FiActivity />
            Показатели
          </div>
        </Link>
        <Link to="/balance-analytics">
          <div className="flex flex-col items-center gap-2.5">
            <SiGoogleanalytics />
            Аналитика
          </div>
        </Link>
        <Link to="/account">
          <div className="flex flex-col items-center gap-2.5">
            <MdManageAccounts />
            Аккаунт
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
