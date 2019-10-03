import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
`;

const Popup = ({ text, closePopup }) => {
  return (
    <PopupContainer>
      <PopupInner>
        <h1>{text}</h1>
        <button onClick={closePopup}>close me</button>
      </PopupInner>
    </PopupContainer>
  );
};

export default Popup;
