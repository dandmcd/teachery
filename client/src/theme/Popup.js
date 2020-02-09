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
  margin-top: 10%;
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
  @media only screen and (min-width: 1100px) {
    left: 30%;
    right: 30%;
  }
`;

export const PopupInnerExtended = styled(PopupInner)`
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
`;

export const PopupHeader = styled.div`
  display: grid;
  background-color: white;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  grid-column-gap: 5px;
`;

export const PopupTitle = styled.h3`
  grid-column-start: 2;
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
  width: 88%;
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
    width: 90%;
    border-color: ${props => props.theme.secondaryLight};
  }
  @media only screen and (min-width: 770px) {
    width: 300px;
    :focus {
      width: 305px;
      border-color: ${props => props.theme.secondaryLight};
    }
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
  width: 88%;
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
    width: 90%;
    border-color: ${props => props.theme.secondaryLight};
  }
  @media only screen and (min-width: 770px) {
    width: 300px;
    :focus {
      width: 305px;
      border-color: ${props => props.theme.secondaryLight};
    }
  }
`;

export const CloseSpan = styled.span`
  grid-column-start: 3;
  justify-self: end;
  display: block;
  width: 36px;
  height: 6px;
  margin: 0 auto;
  z-index: 20;
  background: ${props => props.theme.error};
  border-radius: 3px;
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  :hover {
    background: ${props => props.theme.disabled};
  }
`;

export const PopupFooterButton = styled.button`
  grid-column-start: 3;
  justify-self: end;
  height: auto;
  width: 80px;
  background: none;
  border-radius: 4px;
  margin: 0.2em;
  padding: 0.4em 0.6em;
  border: 2px solid white;
  align-self: center;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
`;

export const CardImg = styled.img`
  object-fit: cover;
  width: 200px;
  height: 150px;
`;

export const CreateButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondary};
  width: 175px;
`;
