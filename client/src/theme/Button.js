import styled from "styled-components";

const Button = styled.button`
  height: auto;
  width: 104px;
  background: none;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.secondary};
  color: ${props => props.theme.text};
  margin: 0.2em;
  padding: 0.25em 1em;
  font-size: 12px;
  font-family: inherit;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
  ::-moz-focus-inner {
    border: 0;
  }
  :hover {
    color: white;
    background: ${props => props.theme.secondary};
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  :disabled {
    border: 2px solid ${props => props.theme.error};
  }
`;

export default Button;
