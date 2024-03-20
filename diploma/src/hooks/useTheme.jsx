import { useLayoutEffect } from "react";
import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    document.getElementById("root").setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
