import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Avatar from "../../assets/avatar.svg";
import LightTheme from "../../assets/lightTheme.svg";
import DarkTheme from "../../assets/darkTheme.svg";
import LogoFirst from "../../assets/logo2.svg";
import LogoSecond from "../../assets/logo3.svg";
import { SiGoogleanalytics } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import Exit from "../Modal/Exit";

const HeaderIn = () => {
  const { theme, setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  
  const handleDarkThemeClick = () => {
    setTheme("dark");
    console.log("theme changed");
  };

  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img
            className="cursor-pointer"
            src={theme === "light" ? LogoFirst : LogoSecond}
          />
        </Link>
        <img
          className="w-10 cursor-pointer"
          src={theme === "light" ? LightTheme : DarkTheme}
          alt={theme === "light" ? "dark" : "light"}
          onClick={
            theme === "light" ? handleDarkThemeClick : handleLightThemeClick
          }
        />
        <Link to="/balance" className="header__element">
          <div className="flex items-center gap-2.5">
            <FiActivity />
            Показатели
          </div>
        </Link>
        <Link to="/balance-analytics" className="header__element">
          <div className="flex items-center gap-2.5">
            <SiGoogleanalytics />
            Аналитика
          </div>
        </Link>
        <Link to="/account" className="header__element">
          <div className="flex items-center gap-2.5">
            <MdManageAccounts />
            Аккаунт
          </div>
        </Link>
        <div className="account__header">
          <img src={Avatar} alt="avatar"></img>
          <span className="flex items-center justify-center">name</span>
          <button className='exit__button' onClick={() => setModalActive(true)}>Выход</button>
          <Exit active={modalActive} setActive={setModalActive} />
        </div>
      </div>
    </div>
  );
};

export default HeaderIn;
