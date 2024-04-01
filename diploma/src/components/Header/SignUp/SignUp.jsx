import React, { useState } from "react";
import styles from "../Form.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (userDetails.password !== userDetails.confirmPassword) {
      setErrors("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://enterpizemate.dyzoon.dev/api/registration/save-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: userDetails.login,
            password: userDetails.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/success");
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrors(
        "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className="pb-3">Регистрация</h1>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login">Логин (E-mail):</label>
            <input
              type="email"
              id="login"
              name="login"
              value={userDetails.login}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors && (
              <div style={{ color: `var(--font-color)` }}>{errors}</div>
            )}
          </div>
          <button  disabled={isLoading}>
            Зарегестрироваться
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
