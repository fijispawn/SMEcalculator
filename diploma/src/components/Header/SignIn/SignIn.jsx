import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Form.module.css";
import { useAuth } from "../../../hooks/AuthContext";

const SignIn = () => {
  const { setLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginResponse = await fetch(
        "https://enterpizemate.dyzoon.dev/api/registration/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem("userLogin", formData.login); 

        const userDetailResponse = await fetch(
          'https://enterpizemate.dyzoon.dev/api/registration/account-info/',
          {
            method: "GET",
            credentials: "include", 
            headers: {}, 
          }
        );

        if (!userDetailResponse.ok) {
          throw new Error("Failed to fetch user details.");
        }

        const userDetails = await userDetailResponse.json();

        setLoggedIn(true);
        navigate("/account");
      } else {
        setError(
          loginData.message || "Неправильный логин или пароль. Попробуйте снова"
        );
      }
    } catch (error) {
      console.error("Sign-in or user details fetch error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2 className="pb-3 sm: text-4xl">Вход в аккаунт</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Логин (E-mail):</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <button disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
