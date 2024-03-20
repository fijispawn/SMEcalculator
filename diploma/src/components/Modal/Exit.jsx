import React from "react";
import styles from "./Exit.module.css";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Exit = ({ active, setActive }) => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate() ;


  const handleExit = () => {
    setLoggedIn(false); 
    setActive(false); 
    navigate('/'); 
  };

  const handleClose = () => setActive(false);

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={handleClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <span>Выйти из аккаунта?</span>
        <div className={styles.buttons}>
          <button className={styles.exit} onClick={handleExit}>Выйти</button> 
          <button className={styles.cancel} onClick={handleClose}>Отмена</button> 
        </div>
      </div>
    </div>
  );
};

export default Exit;
