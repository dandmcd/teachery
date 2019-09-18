import styled from "styled-components";
import Button from "./Button";

export const PopupContainer = styled.div`
  overflow: initial;
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

export const PopupInner = styled.div`
  position: absolute;
  z-index: 40;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  overflow-y: scroll;
  border-radius: 20px;
  background: white;
  text-align: center;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PopupTitle = styled.h3`
  text-align: center;
`;

export const PopupBody = styled.div``;

export const PopupFooterButton = styled(Button)`
  align-self: center;
  justify-self: center;
`;
