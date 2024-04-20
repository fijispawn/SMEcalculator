import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import "../Account.css";
import { useTheme } from "../../../hooks/useTheme";
import LightTheme from "../../../assets/lightTheme.svg";
import DarkTheme from "../../../assets/darkTheme.svg";

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
      <img
          className="w-10 cursor-pointer"
          src={theme === "light" ? LightTheme : DarkTheme}
          alt={theme === "light" ? "dark" : "light"}
          onClick={
            theme === "light" ? handleDarkThemeClick : handleLightThemeClick
          }
        />
        </div>
        <div className="account">
            <div className="change__password">
                <p>Сменить пароль</p>
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
