import styled from "styled-components";

export const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export const AssignmentHeader = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto;
  display: inline-block;
`;

export const AssignmentsWrapper = styled.div`
  margin-top: 0.5em;
`;

export const Title = styled.h2`
  max-width: 1100px;
  margin: auto;
  padding: 0.5em;
  @media only screen and (max-width: 770px) {
    text-align: center;
  }
`;
