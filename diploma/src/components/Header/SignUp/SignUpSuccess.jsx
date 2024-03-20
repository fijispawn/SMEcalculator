import React from 'react';
import styles from "./Success.module.css"

const SignUpSuccess = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Аккаунт успешно создан!</h1>
      <p>Ваша учетная запись успешно создана. Теперь вы можете войти в систему.</p>
    </div>
  );
};

export default SignUpSuccess;
