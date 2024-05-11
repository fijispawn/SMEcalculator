import React, { useState } from "react";
import Avatar from "../../assets/avatar.svg";
import "./AccountData.css";
import { GrLicense } from "react-icons/gr";
import Exit from "../Modal/Exit";
import Button from "../Button/Button";

const AccountData = ({ name, surname }) => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="user__info">
      <img className="w-[170px]" src={Avatar} alt="avatar" />
      <div>{name} {surname}</div>
      <Exit active={modalActive} setActive={setModalActive} />
      <div className="license__info">
        <GrLicense />
        Лицензия действует до: xx.xx.xx
      </div>
      <Button className='exit' text={'Выйти'} ghost={true} onClick={() => setModalActive(true)}/>
    </div>
  );
};

export default AccountData;
