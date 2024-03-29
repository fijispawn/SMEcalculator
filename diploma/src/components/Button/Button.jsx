import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, disabled, className = "", children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${
        disabled ? styles.disabled : ""
      } ${className}`}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
