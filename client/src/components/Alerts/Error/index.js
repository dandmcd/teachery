import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorMessage = ({ error, customError }) => {
  if (error) {
    return (
      <ErrorContainer>
        <Error>{error.message.replace(/^.+:/, "")}</Error>
      </ErrorContainer>
    );
  } else {
    return (
      <ErrorContainer>
        <Error>{customError}</Error>
      </ErrorContainer>
    );
  }
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
  customError: PropTypes.string
};

const ErrorContainer = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  -webkit-box-shadow: 0 0 5px 1px rgba(217, 109, 110, 0.47);
  box-shadow: 0 0 5px 1px rgba(217, 109, 110, 0.47);
`;

const Error = styled.h5`
  color: ${props => props.theme.error};
`;

export default ErrorMessage;
