import styled from "styled-components";
import Button from "../../theme/Button";

export const Grid = styled.div`
  z-index: 15;
  max-width: 1100px;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr;
  -ms-grid-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 20px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;
  margin-top: 0.8em;
  margin-bottom: 0.8em;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (max-device-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  }
`;

export const MessageColumn = styled.div`
  -ms-grid-column: 1;
  -ms-grid-row: 1;
`;

export const TeacherHeader = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0.5em;
  @media only screen and (max-width: 675px) {
    text-align: center;
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  padding: 0.2em 0px 0.2em 4px;
  @media only screen and (max-width: 675px) {
    text-align: center;
    align-self: flex-end;
  }
`;

export const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const SubMenu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Hr = styled.hr`
  padding: 0;
  margin: 0;
  border: none;
  height: 2px;
  width: 100%;
  background-image: -webkit-linear-gradient(
    left,
    ${props => props.theme.primary},
    ${props => props.theme.neutralLight}
  );
`;

export const ViewButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
  width: 175px;
`;

export const AssignmentItemContainer = styled.div`
  z-index: 15;
  width: 90%;
  height: auto;
  max-width: 1100px;
  margin: auto;
  -ms-grid-column: 2;
  -ms-grid-row: 1;
  -ms-grid-column-align: stretch;
  justify-self: stretch;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  background-color: ${props => props.theme.neutralLight};
  border-radius: 24px;
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  :hover {
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
      0 6px 6px rgba(19, 129, 129, 0.125);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
      0 6px 6px rgba(19, 129, 129, 0.125);
  }
  :hover {
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
      0 6px 6px rgba(19, 129, 129, 0.125);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
      0 6px 6px rgba(19, 129, 129, 0.125);
  }
  @media only screen and (max-device-width: 375px) {
    width: 330px;
  }
  @media only screen and (min-width: 1000px) {
    width: 100%;
  }
`;

export const AssignmentDiv = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 228px;
  grid-template-columns: 228px;
  -ms-grid-rows: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const Welcome = styled.h2`
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.83em;
  margin-block-end: 0.83em;
  -webkit-margin-start: 1em;
  margin-inline-start: 1em;
  -webkit-margin-end: 0em;
  margin-inline-end: 0em;
`;

export const Submitted = styled.h3`
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  color: ${props => props.theme.text};
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.5em;
  margin-block-end: 0.5em;
`;

export const SubmittedButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${props => props.theme.primaryDark};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const Overdue = styled.h3`
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  color: ${props => props.theme.error};
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.5em;
  margin-block-end: 0.5em;
`;

export const OverdueButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${props => props.theme.error};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const Incomplete = styled.h3`
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  color: ${props => props.theme.text};
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.5em;
  margin-block-end: 0.5em;
`;

export const IncompleteButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${props => props.theme.primaryMed};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const NotGraded = styled.h3`
  -ms-grid-row: 4;
  -ms-grid-column: 1;
  color: ${props => props.theme.text};
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.5em;
  margin-block-end: 0.5em;
`;

export const NotGradedButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${props => props.theme.secondaryDark};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-transform: scale(1.15);
    transform: scale(1.15);
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    background: ${props => props.theme.secondaryDark};
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const CloseSpan = styled.span`
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-align: end;
  justify-self: end;
  display: block;
  width: 36px;
  height: 6px;
  margin: 0 auto;
  z-index: 20;
  background: ${props =>
    props.tasksChecked || props.assignmentsChecked
      ? props.theme.secondaryDark
      : props.theme.primaryMed};
  border-radius: 3px;
  -webkit-transform-origin: 4px 0px;
  transform-origin: 4px 0px;
  -webkit-transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    opacity 0.55s ease, -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    opacity 0.55s ease, -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease,
    -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  :hover {
    background: ${props => props.theme.disabled};
  }
`;

export const PopupFooterButton = styled.button`
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-align: end;
  justify-self: end;
  height: auto;
  width: 50px;
  background: none;
  border-radius: 4px;
  margin: 0.2em;
  padding: 0.4em 0.3em;
  border: 2px solid ${props => props.theme.neutralLight};
  -ms-grid-row-align: center;
  align-self: center;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
`;
