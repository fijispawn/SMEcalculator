import React from "react";
import { useMediaQuery } from "@mui/material";
import "./HomePage.css";
import { TypeAnimation } from "react-type-animation";
import Main from "../../assets/Main.svg";
import { Link } from "react-router-dom";

function HomePage() {
  const isMobile = useMediaQuery("(max-width:540px)");

  return (
    <div>
      {isMobile ? (
        <div className="mobile_home__container">
          <img className="mobile_main__image" src={Main} />
          <div className="mobile_text">
            <p>
              <TypeAnimation
                sequence={[
                  "EnterprizeMate - незаменимый инструмент для управленческого учета и анализа данных.",
                  1000,
                ]}
                speed={70}
                repeat={Infinity}
              />
            </p>
          </div>
          <Link to="/signup">Создать аккаунт</Link>
          <Link to="/signin">Войти</Link>
        </div>
      ) : (
        <div className="home__container">
          <div className="home__wrapper">
            <img className="main__image" src={Main} />
            <div className="text">
              <p>
                <TypeAnimation
                  sequence={[
                    "Добро пожаловать в EnterprizeMate, ваш незаменимый инструмент для управленческого учета и анализа данных. С EnterprizeMate вы сможете легко вносить данные вашего бизнеса и в считанные секунды получать графики, которые помогут вам увидеть полную картину операционной деятельности вашей компании.",
                    1000,
                  ]}
                  speed={70}
                  repeat={Infinity}
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
