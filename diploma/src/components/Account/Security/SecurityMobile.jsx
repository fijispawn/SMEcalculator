import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import "../Account.css";
import { useTheme } from "../../../hooks/useTheme";
import LightTheme from "../../../assets/lightTheme.svg";
import { FaMoon } from "react-icons/fa";

import { FaSun } from "react-icons/fa";

import DarkTheme from "../../../assets/darkTheme.svg";
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
          <p>Сменить Тему</p>
          {theme === "light" ? (
            <FaSun
              className="w-10 cursor-pointer"
              onClick={handleDarkThemeClick}
            />
          ) : (
            <FaMoon
              className="w-10 cursor-pointer"
              onClick={handleLightThemeClick}
            />
          )}
        </div>
        <div className="account">
          <div className="change__password">
            <p>Сменить пароль</p>
            <FaLock />
          </div>
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
