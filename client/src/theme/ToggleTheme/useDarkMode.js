import { useEffect, useState, useLayoutEffect } from "react";
import { lightTheme, darkTheme, iceTheme } from "../../theme/theme";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [componentMounted, setComponentMounted] = useState(false);

  const toggleTheme = mode => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  // const themeMode =
  //   theme === "light" ? lightTheme : theme === "dark" ? darkTheme : iceTheme;

  useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme
      ? toggleTheme("dark")
      : window.matchMedia("(prefers-color-scheme: ice)").matches && !localTheme
      ? toggleTheme("ice")
      : localTheme
      ? setTheme(localTheme)
      : toggleTheme("light");

    setComponentMounted(true);
  }, []);

  return [theme, setTheme, toggleTheme, componentMounted];
};
