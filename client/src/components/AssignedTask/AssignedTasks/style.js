import styled from "styled-components";
import Button from "../../../theme/Button";
import moment from "moment";

const date = moment().format("YYYYMMDD");

export const AssignmentContainer = styled.div`
  @supports (display: grid) {
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    row-gap: 20px;
    -webkit-column-gap: 5px;
    -moz-column-gap: 5px;
    column-gap: 5px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-items: center;
  }
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-line-pack: distribute;
  align-content: space-around;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 2em auto 2em auto;
`;

export const AssignmentItemContainer = styled.div`
  position: relative;
  z-index: 15;
  width: 330px;
  margin: 0.5em;
  background-color: ${(props) => props.theme.container};
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    -webkit-box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15),
      0 8px 10px rgba(19, 129, 129, 0.125);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15),
      0 8px 10px rgba(19, 129, 129, 0.125);
  }
`;

export const CardGrid = styled.div`
  display: -ms-grid;
  display: grid;
  z-index: 15;
  -ms-grid-rows: auto auto auto 40px 40px 40px;
  grid-template-rows: auto auto auto 40px 40px 40px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -webkit-box-pack: start start;
  -ms-flex-pack: start start;
  justify-content: start start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -o-border-image: linear-gradient(
      to top,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.neutralLight}
    )
    1 100%;
  border-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(${(props) => props.theme.primary}),
      ${(props) => props.theme.neutralLight}
    )
    1 100%;
  border-image: linear-gradient(
      to top,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.neutralLight}
    )
    1 100%;
`;

export const Title = styled.h3`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.primary};
  margin: 0px 0px 0px 5px;
  a {
    color: ${(props) => props.theme.text};
    text-decoration-color: ${(props) => props.theme.primary};
  }
`;

export const Status = styled.h4`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  color: ${(props) =>
    (props.status === "INCOMPLETE" && props.theme.error) ||
    (props.status === "COMPLETE" && props.theme.success) ||
    (props.status === "REVIEWING" && props.theme.primaryDark) ||
    (props.status === "GRADED" && props.theme.secondaryDark)};
`;

export const DueDate = styled.h4`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
  margin: 0;
  color: ${(props) =>
    moment(date).isSameOrAfter(props.dueDate)
      ? props.theme.error
      : props.theme.text};
`;

export const LinkCell = styled.div`
  -ms-grid-row: 4;
  -ms-grid-row-span: 1;
  grid-row: 4 / 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0.2em;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-around;
  justify-content: space-around;
`;

export const Note = styled.p`
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  margin: 0 0 0 0.2em;
  padding: 0.3em 0 0.3em 0;
`;

export const ExternalLink = styled.a`
  font-size: 12px;
`;

export const CreatedInfo = styled.div`
  -ms-grid-row: 4;
  -ms-grid-row-span: 1;
  grid-row: 4 / 5;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  -ms-grid-columns: 1fr;
  grid-template-columns: 1fr;
`;

export const CreatedAt = styled.h6`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0 auto;
  color: ${(props) => props.theme.textLight};
`;

export const CreatedBy = styled.h6`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0 auto;
  color: ${(props) => props.theme.textLight};
`;

export const AssignedTo = styled.h6`
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0 auto;
  color: ${(props) => props.theme.textLight};
`;

export const FileStatus = styled.h5`
  margin: 0;
`;

export const FileUploadStatus = styled.h5`
  -ms-grid-row: 6;
  -ms-grid-row-span: 1;
  grid-row: 6 / 7;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  -ms-grid-row-align: center;
  -ms-grid-column-align: start;
  place-self: center start;
  margin: 0.2em;
`;

export const EditButton = styled(Button)`
  -ms-grid-row: 5;
  -ms-grid-row-span: 1;
  grid-row: 5 / 6;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
`;

export const DownloadIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const NoteButton = styled.h4`
  cursor: pointer;
  margin: 0 auto;
  -ms-grid-row: 6;
  -ms-grid-row-span: 1;
  grid-row: 6 / 7;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
`;

export const NoteIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
