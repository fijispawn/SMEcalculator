import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import "../Account.css";

const Security = () => {
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
        <AccountData />
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

export default Security;
