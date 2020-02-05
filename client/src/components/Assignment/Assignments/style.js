import styled from "styled-components";

export const AssignmentContainer = styled.div`
  z-index: 15;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  margin-bottom: 30px;
`;

export const AssignmentItemContainer = styled.div`
  z-index: 15;
  width: 330px;
  background-color: #fff;

  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15),
      0 8px 10px rgba(19, 129, 129, 0.125);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  z-index: 15;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  justify-content: start start;
  align-content: flex-start;
  border-image: linear-gradient(to top, #c51d1d, #faf9f9) 1 100%;
`;

export const Title = styled.h3`
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.primary};
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  margin: 0px 0px 0px 5px;
  justify-self: stretch;
  align-self: stretch;
  a {
    color: ${props => props.theme.text};
    text-decoration-color: ${props => props.theme.primary};
  }
`;

export const Status = styled.h4`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  color: ${props =>
    (props.status === "INCOMPLETE" && props.theme.error) ||
    (props.status === "COMPLETE" && props.theme.success)};
`;

export const DueDate = styled.h4`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  margin: 0px 0px 0px 5px;
`;

export const Note = styled.p`
  grid-row: 3 / 4;
  grid-column: 1 / 3;
  margin: 0px 0px 0px 5px;
`;

export const ExternalLink = styled.a`
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  justify-self: center;
`;

export const CreatedInfo = styled.div`
  grid-row: 4 / 5;
  grid-column: 2 / 3;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`;

export const CreatedAt = styled.h6`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  color: ${props => props.theme.textLight};
`;

export const CreatedBy = styled.h6`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  color: ${props => props.theme.textLight};
`;
