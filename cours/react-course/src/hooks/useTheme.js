import { use } from "react";
import { ThemeContext } from "../contexts/theme/ThemeContext";

const useTheme = () => {
  const context = use(ThemeContext);

  // Check if the context is undefinded or null
  if (!context) {
    console.log("useTheme must be used in ThemeContext provider");
  }

  // console.log("context :", context);
  return context;
};

export default useTheme;
