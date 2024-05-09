import React, { useState } from "react";
import "../Account.css";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import { MdEdit } from "react-icons/md";
import Button from "../../Button/Button";

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

  const allFieldsEmpty = () => {
    return Object.values(form).every(field => field.trim() === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userLogin = localStorage.getItem("userLogin");

    const updatedData = { ...form, login: userLogin };

    fetch("https://enterpizemate.dyzoon.dev/api/registration/account-info/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setUserInfo(form); // Update the displayed user info with the submitted form data
      setIsEditing(false); // Hide the form after updating
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const displayUserInfo = () => {
    if (Object.values(userInfo).some(value => value.trim() !== "")) {
      return (
        <>
          <div className="edited">
            <span>Имя: {userInfo.name}</span>
            <span>Фамилия: {userInfo.surname}</span>
            <span>Название предприятия: {userInfo.company}</span>
            <span>Доход с начала года (в руб): {userInfo.income}</span>
          </div>
          <Button text="Изменить" onClick={handleEditClick}/>
        </>
      );
    } else {
      return (
        <>
          <span className="w-[280px] text-xl" >Отсутствует информация о пользователе</span>
          <Button
            className="flex justify-center items-center gap-1"
            onClick={handleEditClick}
          >
            <MdEdit /> Изменить
          </Button>
        </>
      );
    }
  };

  return (
    <AccountWrapper activeTab="account">
      <div className="account__wrapper">
        <AccountData name={userInfo.name} surname={userInfo.surname} />
        <div className="edit">{displayUserInfo()}</div>
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
              <Button
                disabled={allFieldsEmpty()}
                text="Сохранить"
              />
            </form>
          </div>
        )}
      </div>
    </AccountWrapper>
  );
};

export default Account;
