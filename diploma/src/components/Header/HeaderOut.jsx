import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useTheme } from "../../hooks/useTheme";
import LightTheme from "../../assets/lightTheme.svg";
import DarkTheme from "../../assets/darkTheme.svg";
import LogoFirst from "../../assets/logo2.svg";
import LogoSecond from "../../assets/logo3.svg";

const HeaderOut = () => {
  const { theme, setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
    console.log("theme changed");
  };

  return (
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
        <Link to="/signup" >Создать аккаунт</Link>
        <Link to="/signin" >Войти</Link>
    </div>
  );
};

export default HeaderOut;
