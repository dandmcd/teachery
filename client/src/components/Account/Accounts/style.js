import styled from "styled-components";
import Button from "../../../theme/Button";

export const Container = styled.div`
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

export const SubTitle = styled.h2`
  margin: 0;
  padding: 0.2em 0px 0.2em 4px;
  @media only screen and (max-width: 675px) {
    text-align: center;
    align-self: flex-end;
  }
`;

export const Field = styled.h4`
  margin-left: 10px;
`;

export const SubMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
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

export const Span = styled.span`
  color: ${props => props.theme.primary};
  font-weight: lighter;
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

export const ChangePasswordButton = styled(Button)`
  width: 120px;
  font-size: 10px;
  border: 2px solid ${props => props.theme.primary};
`;
