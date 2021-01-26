import React from "react";
import PropTypes from "prop-types";
import * as Styled from "../../theme/Popup";
import ClickHandler from "../../utilities/ClickHandler";
import styled from "styled-components";

const Modal = ({ children, toggleOn, onToggleOffModal }) => {
  return toggleOn ? (
    <Styled.PopupContainer>
      <BackgroundOverlay />
      <ClickHandler toggleOn={toggleOn} closeModal={onToggleOffModal}>
        <Styled.PopupInnerExtended>
          <div>{children}</div>
        </Styled.PopupInnerExtended>
      </ClickHandler>
    </Styled.PopupContainer>
  ) : null;
};

const BackgroundOverlay = styled.div`
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  position: fixed;
  touch-action: none;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggleOn: PropTypes.bool.isRequired,
  onToggleOffModal: PropTypes.func.isRequired,
};

export default Modal;
