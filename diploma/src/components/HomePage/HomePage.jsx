import React from "react";
import "./HomePage.css";
import { TypeAnimation } from "react-type-animation";
import Main from "../../assets/Main.svg";

function HomePage() {
  return (
    <div className="home__container">
      <div className="home__wrapper">
        <img className="main__image" src={Main} alt="главное изображение" />
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
  );
}

export default HomePage;
