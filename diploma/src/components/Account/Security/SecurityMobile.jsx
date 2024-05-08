import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import "../Account.css";
import { useTheme } from "../../../hooks/useTheme";
import LightTheme from "../../../assets/lightThemeMob.svg";  // Path might need adjustment
import DarkTheme from "../../../assets/darkThemeMob.svg";   // Path might need adjustment
import { FaLock } from "react-icons/fa6";

const SecurityMobile = () => {
  const { theme, setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
    console.log("theme changed");
  };

  const [form, setForm] = useState({
    oldpassword: "",
    newpassword: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <AccountWrapper activeTab="security">
      <div className="account__wrapper">
        <div className="theme__toggle">
          <p>Сменить тему</p>
          {theme === "light" ? (
            <img
              src={DarkTheme}  // Image for dark theme toggle
              alt="Toggle Dark Theme"
              className="w-10 cursor-pointer"
              onClick={handleDarkThemeClick}
            />
          ) : (
            <img
              src={LightTheme}  // Image for light theme toggle
              alt="Toggle Light Theme"
              className="w-10 cursor-pointer"
              onClick={handleLightThemeClick}
            />
          )}
        </div>
        <div className="change__password">
          <FaLock />
          <p>Сменить пароль</p>
        </div>
        <div className="account">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="password"
              name="oldpassword"
              onChange={handleChange}
              value={form.oldpassword}
              placeholder="Старый пароль"
            />
            <input
              type="password"
              name="newpassword"
              onChange={handleChange}
              value={form.newpassword}
              placeholder="Новый пароль"
            />
            <input
              type="password"
              name="confirm"
              onChange={handleChange}
              value={form.confirm}
              placeholder="Подтвердите новый пароль"
            />
            <button>Сохранить</button>
          </form>
        </div>
      </div>
    </AccountWrapper>
  );
};

export default SecurityMobile;
