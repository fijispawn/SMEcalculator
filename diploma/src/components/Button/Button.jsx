import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, disabled, className = "", ghost = false, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${ghost ? styles.ghost : ""} ${
        disabled ? styles.disabled : ""
      } ${className}`}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
