import React, { useState, useEffect } from "react";
import "../Account.css";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import { MdEdit } from "react-icons/md";
import Button from "../../Button/Button";
import { useUser } from "../../../hooks/UserContext";

const Account = () => {
  const { setUserName } = useUser();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    companyName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFieldsEmpty = () => {
    return Object.values(form).every((field) => (field || "").trim() === "");
  };

  const fetchUserInfo = () => {
    const userLogin = localStorage.getItem("userLogin");
    fetch(`https://enterpizemate.dyzoon.dev/api/registration/account-info/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo({
          name: data.name || "",
          surname: data.surname || "",
          companyName: data.companyName || "",
        });
      })
      .catch((error) => {
        console.error("Problem fetching user info:", error);
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
      credentials: "include",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text(); // Assuming the server might not return JSON
    })
    .then(data => {
      setUserInfo(form);
      setUserName(form.name); 
      setIsEditing(false); 
    })
    .catch(error => {
      console.error("Error updating user info:", error);
    });
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form to the last saved userInfo
    setForm({
      name: userInfo.name || "",
      surname: userInfo.surname || "",
      companyName: userInfo.companyName || "",
    });
  };
  
  return (
    <AccountWrapper activeTab="account">
      <div className="account__wrapper">
        <AccountData name={userInfo.name} surname={userInfo.surname} />
        {isEditing ? (
          <div className="account__form">
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
              <div className="flex flex-col gap-[10px]">
                <Button text="Отменить" onClick={handleCancelClick} />
                <Button text="Сохранить" disabled={allFieldsEmpty()} />
              </div>
            </form>
          </div>
        ) : (
          <div className="user__info">
            <div className="edited">
              <span>Имя: {userInfo.name}</span>
              <span>Фамилия: {userInfo.surname}</span>
              <span>Название предприятия: {userInfo.companyName}</span>
            </div>
            <Button
              className="flex items-center justify-center gap-[4px]"
              onClick={handleEditClick}
            >
              <MdEdit /> Изменить
            </Button>
          </div>
        )}
      </div>
    </AccountWrapper>
  );
  };
  
export default Account;
