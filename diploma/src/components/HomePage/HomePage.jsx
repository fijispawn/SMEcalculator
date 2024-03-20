import React from "react";
import "./HomePage.css";
import { TypeAnimation } from "react-type-animation";
import Main from '../../assets/Main.svg'

function HomePage() {
  return (
    <div className="home__container">
      <div className="home__wrapper">
      <img className="main__image" src={Main} alt="главное изображение" />
      <div className="text">
        <p>
          <TypeAnimation
            sequence={[
              "Lorem ipsum dolor sit amet,  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </p>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
