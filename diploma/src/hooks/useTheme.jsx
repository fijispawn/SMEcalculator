import { useEffect, useState } from "react";

export const useTheme = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light");
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.getElementById("root").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
