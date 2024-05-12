import React, { useState, useEffect } from "react";
import "../Account.css";
import { AccountWrapper } from "../AccountWrapper/AccountWrapper";
import AccountData from "../AccountData";
import { MdEdit } from "react-icons/md";
import Button from "../../Button/Button";
import MobileInfoModal from "../../Modal/MobileInfoModal";

const InfoMobile = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    companyName: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          name: data.name || "Not provided",
          surname: data.surname || "Not provided",
          companyName: data.companyName || "Not provided",
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

    fetch(
      "https://enterpizemate.dyzoon.dev/api/registration/account-info/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        setUserInfo(form);
        setModalOpen(false);  
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
      });
  };

  const handleEditClick = () => {
    setForm(userInfo); 
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <AccountWrapper activeTab="account">
      <div className="account__wrapper">
        <AccountData name={userInfo.name} surname={userInfo.surname} />
        <div className="edit">
          <div className="edited">
            <span>Имя: {userInfo.name}</span>
            <span>Фамилия: {userInfo.surname}</span>
            <span>Название предприятия: {userInfo.companyName}</span>
          </div>
          <Button className="flex items-center justify-center gap-[4px]" onClick={handleEditClick}>
            <MdEdit /> Изменить
          </Button>
        </div>
        <MobileInfoModal isOpen={modalOpen} onClose={handleCloseModal}>
          <form className="form" onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} value={form.name} placeholder="Имя" />
            <input name="surname" onChange={handleChange} value={form.surname} placeholder="Фамилия" />
            <input name="companyName" onChange={handleChange} value={form.companyName} placeholder="Название предприятия" />
            <button onClick={handleSubmit}>Сохранить</button>
          </form>
        </MobileInfoModal>
      </div>
    </AccountWrapper>
  );
};

export default InfoMobile;
