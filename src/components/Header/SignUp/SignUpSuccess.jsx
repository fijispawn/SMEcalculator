import React from 'react';
import styles from "./Success.module.css"
import { Link } from 'react-router-dom';

const SignUpSuccess = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Аккаунт успешно создан!</h1>
      <p>Ваша учетная запись успешно создана. Теперь вы можете  <Link to="/signin" className={styles.link}> войти в систему.</Link></p>
    </div>
  );
};

export default SignUpSuccess;
