import React from 'react';
import { Link } from "react-router-dom";
import '../Account.css'

const AccountNav = ({ activeTab }) => {
  return (
    <div className="tab__container">
      <Link to="/account" className={`tab ${activeTab === 'account' ? 'tab__main' : 'tab'}`}>
        Информация
      </Link>
      <Link to="/security" className={`tab ${activeTab === 'security' ? 'tab__main' : 'tab'}`}>
        Безопасность
      </Link>
      <Link to="/license" className={`tab ${activeTab === 'license' ? 'tab__main' : 'tab'}`}>
        Лицензия
      </Link>
    </div>
  );
};

export default AccountNav;
