import React, { useState } from "react";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import "../Account.css";
import Button from "../../Button/Button";

const Security = () => {
  const [form, setForm] = useState({
    oldpassword: "",
    newpassword: "",
    confirm: "",
  });

  const [showForm, setShowForm] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const handleShowForm = () => {
    setShowForm(true); 
  };

  const allFieldsEmpty = () => {
    return Object.values(form).every(field => field.trim() !== "");
  };

  return (
    <AccountWrapper activeTab="security">
      <div className="account__wrapper">
        <AccountData />
        <div className="account">
          {!showForm && (
            <Button text={'Изменить пароль'} onClick={handleShowForm}/>
          )}
          {showForm && (
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
            <Button text={'Сохранить'} disabled={!allFieldsEmpty()}/>
            </form>
          )}
        </div>
      </div>
    </AccountWrapper>
  );
};

export default Security;
