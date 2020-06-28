import React from "react";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const Loading = () => (
  <Container>
    <Spinner alt="Loading..." />
  </Container>
);

const Container = styled.div`
  width: 200px;
  margin: auto;
  display: block;

  svg {
    height: auto;
    width: 10rem;
  }
`;

export default Loading;
