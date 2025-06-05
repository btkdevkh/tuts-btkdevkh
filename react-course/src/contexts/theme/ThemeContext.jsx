import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const handleChangeTheme = (theme) => {
    console.log("theme :", theme);

    if (theme === "light") {
      return setTheme(theme);
    }

    setTheme("dark");
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeProvider;
