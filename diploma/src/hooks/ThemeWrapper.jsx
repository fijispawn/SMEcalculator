import React from "react";
import { useTheme } from "./useTheme";
const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  return <>{children}</>;
};

export default ThemeWrapper;
