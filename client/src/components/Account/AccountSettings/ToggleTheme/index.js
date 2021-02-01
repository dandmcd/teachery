import React from "react";
import PropTypes from "prop-types";
import { lightTheme, darkTheme, iceTheme } from "../../../../theme/theme";
import * as Styled from "../../Accounts/style";

const ToggleTheme = ({ props: { setTheme } }) => {
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
        <Styled.ThemeField>Choose a color theme:</Styled.ThemeField>
        <Styled.ThemeButton onClick={setLightTheme}>Light</Styled.ThemeButton>
        <Styled.DarkThemeButton onClick={setDarkTheme}>
          Dark
        </Styled.DarkThemeButton>
        <Styled.IceThemeButton onClick={setIceTheme}>Ice</Styled.IceThemeButton>
      </Styled.ThemeGrid>
    </Styled.Container>
  );
};

ToggleTheme.propTypes = {
  setTheme: PropTypes.func.isRequired,
};

export default ToggleTheme;
