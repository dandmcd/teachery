import React from "react";
import { func, string } from "prop-types";
import { ReactComponent as LightIcon } from "../../assets/light.svg";
import { ReactComponent as DarkIcon } from "../../assets/dark.svg";
import * as Styled from "./style";

const ToggleTheme = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <Styled.ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      {isLight ? <LightIcon /> : <DarkIcon />}
    </Styled.ToggleContainer>
  );
};

ToggleTheme.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired
};

export default ToggleTheme;
