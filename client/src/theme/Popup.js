import styled from "styled-components";
import Button from "./Button";

export const PopupContainer = styled.div`
  overflow: auto;
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PopupGridContainer = styled(PopupContainer)`
  background-color: rgba(0, 0, 0, 0.4);
`;

export const PopupInner = styled.div`
  position: absolute;
  z-index: 40;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: 10% auto;
  overflow-y: scroll;
  border-radius: 20px;
  background: ${props => props.theme.neutralLight};
  text-align: center;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-device-width: 480px) {
    left: 10%;
    right: 10%;
  }
`;

export const PopupInnerExtended = styled(PopupInner)`
  top: 10%;
  bottom: 10%;
`;

export const PopupTitle = styled.h3`
  text-align: center;
`;

export const PopupBody = styled.div``;

export const Input = styled.input`
  border: 0;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  ::placeholder {
    font-family: "Open Sans", sans-serif;
    font-weight: 400px;
    font-size: 12px;
    color: ${props => props.theme.text};
  }
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputTextArea = styled.textarea`
  border: 0;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  ::placeholder {
    font-family: "Open Sans", sans-serif;
    font-weight: 400px;
    font-size: 12px;
    color: ${props => props.theme.text};
  }
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const PopupFooterButton = styled(Button)`
  border-color: ${props => props.theme.secondaryDark};
  align-self: center;
  justify-self: center;
`;
