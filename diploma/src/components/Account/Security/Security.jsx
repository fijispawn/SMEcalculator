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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if old password is entered
    if (!form.oldpassword) {
      setMessage("Please enter your old password.");
      return;
    }

    // Validate new passwords match
    if (form.newpassword !== form.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    // Further validation can be added here (e.g., password strength)

    try {
      const response = await fetch(
        "https://enterpizemate.dyzoon.dev/api/registration/account-info/set-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: form.newpassword, // Only new password needed for the backend
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password changed successfully.");
        setForm({ oldpassword: "", newpassword: "", confirm: "" }); // Reset form on success
      } else {
        throw new Error(data.message || "Failed to change password");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const allFieldsFilled = () => {
    return (
      form.oldpassword.trim() !== "" &&
      form.newpassword.trim() !== "" &&
      form.confirm.trim() !== ""
    );
  };

  return (
    <AccountWrapper activeTab="security">
      <div className="account__wrapper">
        <AccountData />
        <div className="account">
          {!showForm && (
            <Button text={"Изменить пароль"} onClick={handleShowForm} />
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
              <Button text={"Сохранить"} disabled={!allFieldsFilled()} />
            </form>
          )}
          {message && <div className="message">{message}</div>}{" "}
          {/* Display success or error message */}
        </div>
      </div>
    </AccountWrapper>
  );
};

export default Security;
