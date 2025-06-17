import { useEffect } from "react";
import useTheme from "../hooks/useTheme";

const ThemeButton = () => {
  const { theme, handleChangeTheme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    } else {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
    }
  }, [theme]);

  return (
    <button
      className={`theme-button ${
        theme === "light" ? "theme-button-light" : ""
      }`}
      onClick={() => {
        if (theme === "light") {
          return handleChangeTheme("dark");
        }

        handleChangeTheme("light");
      }}
    >
      Changer de Thème
    </button>
  );
};

export default ThemeButton;
