import React, { useState } from "react";
import "../Account.css";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import { MdEdit } from "react-icons/md";

const Account = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    company: "",
    income: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setUserInfo(form);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const displayUserInfo = () => {
    const hasInfo = Object.values(userInfo).some(
      (value) => value.trim() !== ""
    );
    if (hasInfo) {
      return (
        <>
          <div className="edited">
            <span>Имя: {userInfo.name}</span>
            <span>Фамилия: {userInfo.surname}</span>
            <span>Название предприятия: {userInfo.company}</span>
            <span>Доход с начала года (в руб): {userInfo.income}</span>
          </div>
          <button onClick={handleEditClick}>
            Изменить 
          </button>
        </>
      );
    } else {
      return (
        <>
          <span>Отсутствует информация о пользователе</span>
          <button className="flex justify-center items-center gap-1" onClick={handleEditClick}><MdEdit/> Изменить</button>
        </>
      );
    }
  };

  return (
    <AccountWrapper activeTab="account">
      <div className="account__wrapper">
        <AccountData name={userInfo.name} surname={userInfo.surname} />
        {!isEditing && <div className="edit">{displayUserInfo()}</div>}
        {isEditing && (
          <div className="account">
            <form className="form" onSubmit={handleSubmit}>
              <input
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Имя"
              />
              <input
                name="surname"
                onChange={handleChange}
                value={form.surname}
                placeholder="Фамилия"
              />
              <input
                name="company"
                onChange={handleChange}
                value={form.company}
                placeholder="Название предприятия"
              />
              <input
                name="income"
                onChange={handleChange}
                value={form.income}
                placeholder="Доход с начала года (в руб)"
              />
              <button type="submit">Сохранить</button>
            </form>
          </div>
        )}
      </div>
    </AccountWrapper>
  );
};

export default Account;
