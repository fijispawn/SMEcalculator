import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import "../Account.css";
import { useTheme } from "../../../hooks/useTheme";
import LightTheme from "../../../assets/lightThemeMob.svg";  
import DarkTheme from "../../../assets/darkThemeMob.svg";   
import { FaLock } from "react-icons/fa6";

const SecurityMobile = () => {
  const { theme, setTheme } = useTheme();
  const [form, setForm] = useState({
    oldpassword: "",
    newpassword: "",
    confirm: "", 
  });
  const [message, setMessage] = useState(""); // State to store feedback messages

  const handleLightThemeClick = () => {
    setTheme("light");
  };

  const handleDarkThemeClick = () => {
    setTheme("dark");
    console.log("theme changed");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newpassword !== form.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://enterpizemate.dyzoon.dev/api/registration/account-info/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: form.newpassword  // Only new password is needed for the backend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password changed successfully.");
        setForm({oldpassword: "", newpassword: "", confirm: ""}); // Clear form on success
      } else {
        throw new Error(data.message || "Failed to change password");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <AccountWrapper activeTab="security">
      <div className="account__wrapper">
        <div className="theme__toggle">
          <p>Сменить тему</p>
          {theme === "light" ? (
            <img
              src={DarkTheme}
              alt="Toggle Dark Theme"
              className="w-10 cursor-pointer"
              onClick={handleDarkThemeClick}
            />
          ) : (
            <img
              src={LightTheme}
              alt="Toggle Light Theme"
              className="w-10 cursor-pointer"
              onClick={handleLightThemeClick}
            />
          )}
        </div>
        <div className="change__password">
          <FaLock />
          <p>Сменить пароль</p>
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
            <button type="submit">Сохранить</button>
          </form>
        </div>
        {message && <div className="message">{message}</div>} {/* Display feedback message */}
      </div>
    </AccountWrapper>
  );
};

export default SecurityMobile;
