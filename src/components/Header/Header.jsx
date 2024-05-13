import React, { useState, useEffect } from "react";
import HeaderIn from "./HeaderIn";
import HeaderOut from "./HeaderOut";
import { useAuth } from "../../hooks/AuthContext";

const Header = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          "https://enterpizemate.dyzoon.dev/api/registration/account-info/",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserInfo(data);
        setLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchAccountInfo();
  }, []);

  return isLoggedIn ? <HeaderIn /> : <HeaderOut />;
};

export default Header;
