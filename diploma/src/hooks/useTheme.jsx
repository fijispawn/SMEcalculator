import { useEffect, useState } from "react";

export const useTheme = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light");
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.setAttribute("data-theme", theme);
    } else {
      console.error("Root element not found");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  

  return { theme, setTheme };
};
