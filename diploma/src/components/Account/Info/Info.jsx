import React, { useState, useEffect } from "react";
import "../Account.css";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import { MdEdit } from "react-icons/md";
import Button from "../../Button/Button";

const Account = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    companyName: "",
    yield: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFieldsEmpty = () => {
    return Object.values(form).every(field => field.trim() === "");
  };

  const fetchUserInfo = () => {
    const userLogin = localStorage.getItem("userLogin"); // Assuming 'userLogin' is stored in localStorage
    fetch(`https://enterpizemate.dyzoon.dev/api/registration/account-info/${userLogin}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setUserInfo(data);
    })
    .catch((error) => {
      console.error("There has been a problem with fetching user info:", error);
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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

  const handleCancelClick = () => {
    setIsEditing(false);
    fetchUserInfo(); // Refresh user info when cancelling editing
  };

  return (
    <AccountWrapper activeTab="account">
      <div className="account__wrapper">
        <AccountData name={userInfo.name} surname={userInfo.surname} />
        <div className="user-info">
          {Object.keys(userInfo).length ? (
            <>
              <div className="edited">
                <span>Имя: {userInfo.name}</span>
                <span>Фамилия: {userInfo.surname}</span>
                <span>Название предприятия: {userInfo.companyName}</span>
                <span>Доход с начала года (в руб): {userInfo.yield}</span>
              </div>
              {!isEditing && (
                <Button text="Изменить" onClick={handleEditClick}/>
              )}
            </>
          ) : (
            <span className="w-[280px] text-xl" >Отсутствует информация о пользователе</span>
          )}
        </div>
        {isEditing && (
          <div className="account-form">
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
                name="companyName"
                onChange={handleChange}
                value={form.companyName}
                placeholder="Название предприятия"
              />
              <input
                name="yield"
                onChange={handleChange}
                value={form.yield}
                placeholder="Доход с начала года (в руб)"
              />
              <Button text="Сохранить" disabled={allFieldsEmpty()}/>
              <Button text="Отменить" onClick={handleCancelClick}/>
            </form>
          </div>
        )}
      </div>
    </AccountWrapper>
  );
};

export default Account;
