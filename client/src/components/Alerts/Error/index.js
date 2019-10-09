import React from "react";
import styled from "styled-components";

const ErrorMessage = ({ error }) => {
  return (
    <ErrorContainer>
      <Error>{error.message.replace(/^.+:/, "")}</Error>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 5px 1px rgba(217, 109, 110, 0.47);
`;

const Error = styled.h5`
  color: ${props => props.theme.error};
`;

export default ErrorMessage;
