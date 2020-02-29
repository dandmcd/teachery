import styled from "styled-components";

export const ToggleContainer = styled.button`
  display: table-cell;
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 50px;
  width: 50px;
  max-width: 50px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${props => props.theme.text};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
    transform: scale(1.1);
  }

  svg {
    height: auto;
    width: 2rem;
    transition: all 0.3s linear;
    }
  }
`;
