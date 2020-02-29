import React, { Fragment } from "react";
import { lightTheme, darkTheme, iceTheme } from "../../theme/theme";
import * as Styled from "../../components/Account/Accounts/style";

const ToggleTheme = ({ props: { setTheme } }) => {
  console.log(typeof setTheme);

  const setLightTheme = () => {
    setTheme(lightTheme);
    window.localStorage.setItem("theme", "light");
  };

  const setDarkTheme = () => {
    setTheme(darkTheme);
    window.localStorage.setItem("theme", "dark");
  };

  const setIceTheme = () => {
    setTheme(iceTheme);
    window.localStorage.setItem("theme", "ice");
  };
  return (
    <Styled.Container>
      <Styled.ThemeGrid>
        <Styled.Field>Choose a color theme:</Styled.Field>
        <Styled.ThemeButton onClick={setLightTheme}>Light</Styled.ThemeButton>
        <Styled.DarkThemeButton onClick={setDarkTheme}>
          Dark
        </Styled.DarkThemeButton>
        <Styled.IceThemeButton onClick={setIceTheme}>Ice</Styled.IceThemeButton>
      </Styled.ThemeGrid>
    </Styled.Container>
  );
};

export default ToggleTheme;
