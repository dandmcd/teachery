import styled from "styled-components";
import Button from "../../../theme/Button";

export const AssignmentContainer = styled.div`
  z-index: 15;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  row-gap: 20px;
  column-gap: 5px;
  align-items: center;
  justify-items: center;
  max-width: 1100px;
  margin: 0.5em auto 20px auto;
`;

export const AssignmentItemContainer = styled.div`
  z-index: 15;
  width: 330px;
  background-color: ${props => props.theme.container};

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
  background-color: ${props => props.theme.neutralLight};
  grid-template-rows: auto auto 40px 40px;
  grid-template-columns: 1fr 1fr;
  justify-content: start start;
  align-content: flex-start;
  border-image: linear-gradient(
      to top,
      ${props => props.theme.primary},
      ${props => props.theme.neutralLight}
    )
    1 100%;
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

export const DueDate = styled.h4`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  margin: 0px 0px 0px 5px;
`;

export const Note = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin: 0px 0px 0px 5px;
  padding: 0.2em;
`;

export const ExternalLink = styled.a`
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
`;

export const CreatedInfo = styled.div`
  grid-row: 3/ 4;
  grid-column: 2 / 3;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`;

export const CreatedAt = styled.h6`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 0 auto;
  color: ${props => props.theme.textLight};
`;

export const CreatedBy = styled.h6`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  margin: 0 auto;
  color: ${props => props.theme.textLight};
`;

export const EditDropDown = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  position: relative;
  display: flex;
  z-index: 30;
`;

export const EditDropDownContent = styled.div`
  display: ${props => (props.isChecked ? "block" : "none")};
  position: absolute;
  width: min-content;
  background-color: ${props => props.theme.container};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 30;
  bottom: 100%;
`;

export const EditButton = styled(Button)``;

export const AssignButton = styled(Button)``;

export const ManageButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export const FileStatus = styled.h5`
  grid-row: 4 / 5;
  grid-column: 2 / 3;
  margin: 0;
`;

export const FileUploadStatus = styled.h5`
  grid-row: 4 / 5;
  grid-column: 2 / 3;
  place-self: center start;
  margin: 0;
`;

export const DownloadIcon = styled.img`
  width: 20px;
  height: 20px;
`;
