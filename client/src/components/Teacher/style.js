import styled from "styled-components";
import Button from "../../theme/Button";

export const Grid = styled.div`
  z-index: 15;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const SubMenu = styled.div`
  display: flex;
  justify-content: flex-start;
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
  height: 306px;
  max-width: 1100px;
  margin: auto;
  justify-self: stretch;
  align-self: center;
  background-color: ${props => props.theme.neutralLight};
  border-radius: 24px;
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  :hover {
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
  display: grid;
  grid-template-columns: 228px;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

export const Welcome = styled.h2`
  margin-block-start: 0.5em;
  margin-block-end: 0.83em;
  margin-inline-start: 1em;
  margin-inline-end: 0em;
`;

export const Submitted = styled.h3`
  color: ${props => props.theme.text};
  margin-block-start: 0.5em;
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
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    transform: scale(1.15);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
`;

export const Overdue = styled.h3`
  color: ${props => props.theme.error};
  margin-block-start: 0.5em;
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
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    transform: scale(1.15);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
  :active {
    filter: brightness(115%);
  }
`;

export const Incomplete = styled.h3`
  color: ${props => props.theme.text};
  margin-block-start: 0.5em;
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
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    transform: scale(1.15);
    filter: brightness(105%);
    background: ${props => props.theme.primaryDark};
  }
  :active {
    filter: brightness(115%);
  }
`;

export const NotGraded = styled.h3`
  color: ${props => props.theme.text};
  margin-block-start: 0.5em;
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
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    transform: scale(1.15);
    filter: brightness(105%);
    background: ${props => props.theme.secondaryDark};
  }
  :active {
    filter: brightness(115%);
  }
`;

export const CloseSpan = styled.span`
  grid-column-start: 3;
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
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  :hover {
    background: ${props => props.theme.disabled};
  }
`;

export const PopupFooterButton = styled.button`
  grid-column-start: 3;
  justify-self: end;
  height: auto;
  width: 50px;
  background: none;
  border-radius: 4px;
  margin: 0.2em;
  padding: 0.4em 0.3em;
  border: 2px solid ${props => props.theme.neutralLight};
  align-self: center;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
`;
