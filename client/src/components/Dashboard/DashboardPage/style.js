import styled from "styled-components";
import Button from "../../../theme/Button";
import malcolmx from "../../../assets/malcolmx.jpg";

export const DashboardGrid = styled.div`
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

export const AssignmentItemContainer = styled.div`
  -ms-grid-column: 2;
  -ms-grid-row: 1;
  z-index: 15;
  width: 90%;
  height: 306px;
  max-width: 1100px;
  margin: auto;

  -ms-grid-column-align: stretch;
  justify-self: stretch;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  background-color: ${props => props.theme.container};
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

export const Welcome = styled.h2`
  -webkit-margin-before: 0.5em;
  margin-block-start: 0.5em;
  -webkit-margin-after: 0.83em;
  margin-block-end: 0.83em;
  -webkit-margin-start: 0.5em;
  margin-inline-start: 0.5em;
  -webkit-margin-end: 0px;
  margin-inline-end: 0px;
`;

export const Title = styled.h3`
  -webkit-margin-start: 2em;
  margin-inline-start: 2em;
  -webkit-margin-end: 2em;
  margin-inline-end: 2em;
`;

export const AssignmentDiv = styled.div`
  -ms-grid-column: 2;
  -ms-grid-row: 1;
  -webkit-margin-start: 5em;
  margin-inline-start: 5em;
  -webkit-margin-end: 5em;
  margin-inline-end: 5em;
`;

export const Overdue = styled.h4`
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
  }
`;

export const DueButton = styled.button`
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
  background-color: ${props => props.theme.secondary};
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

export const EmptyAssignmentItemContainer = styled.div`
  z-index: 15;
  width: 330px;
  height: 106px;
  background-color: ${props => props.theme.container};
  /* background-image: url(${malcolmx});
  background-size: 330px auto;
  background-repeat: no-repeat;
  background-position-y: -20px;
  position: relative;
  background-color: hsla(0, 0%, 100%, 0.7);
  background-blend-mode: overlay; */
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

export const EmptyCardGrid = styled.div`
  display: -ms-grid;
  display: grid;
  z-index: 15;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
  -ms-grid-columns: 1fr;
  grid-template-columns: 1fr;
  -webkit-box-pack: start start;
  -ms-flex-pack: start start;
  justify-content: start start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -o-border-image: linear-gradient(
      to top,
      ${props => props.theme.primary},
      ${props => props.theme.neutralLight}
    )
    1 100%;
  border-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(${props => props.theme.primary}),
      ${props => props.theme.neutralLight}
    )
    1 100%;
  border-image: linear-gradient(
      to top,
      ${props => props.theme.primary},
      ${props => props.theme.neutralLight}
    )
    1 100%;
`;

export const EmptyNote = styled.p`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  font-style: italic;
  margin: 0px 0px 0px 5px;
  padding: 0.2em;
`;

export const EmptyTitle = styled.h3`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  letter-spacing: 0.07em;
  text-decoration: underline;
  -ms-grid-row-align: center;
  -ms-grid-column-align: end;
  place-self: center end;
  text-decoration-color: ${props => props.theme.primary};
  margin: 0px 5px 0px 0px;
  a {
    color: ${props => props.theme.text};
    text-decoration-color: ${props => props.theme.primary};
  }
`;

export const EmptyTitleSpan = styled.span`
  text-decoration: none;
  display: inline-block;
`;

export const DeckGrid = styled.div`
  z-index: 15;
  display: -ms-grid;
  display: grid;
  max-width: 1100px;
  -ms-grid-columns: 720px 5px 1fr;
  grid-template-columns: 720px 1fr;
  -ms-grid-rows: 560px;
  grid-template-rows: 560px;
  grid-gap: 5px;
  margin: 0.5em auto auto auto;
  @media only screen and (max-width: 770px) {
    -ms-grid-rows: 560px 560px 560px;
    grid-template-rows: 560px 560px 560px;
  }
  @media only screen and (max-width: 1000px) {
    display: inherit;
    -ms-grid-columns: 720px;
    grid-template-columns: 720px;
  }
`;

export const GridCol = styled.div`
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  @media only screen and (max-width: 770px) {
    justify-self: center;
  }
  @media only screen and (max-width: 1000px) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
    grid-column: 1 / 2;
  }
`;

export const GridButtonCol = styled.div`
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-row-align: center;
  -ms-grid-column-align: center;
  place-self: center;
  @media only screen and (max-width: 770px) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
    grid-column: 1 / 2;
    -ms-grid-row: 3;
    -ms-grid-row-span: 1;
    grid-row: 3 / 4;
  }
  @media only screen and (max-width: 1000px) {
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
    grid-column: 1 / 2;
    -ms-grid-row: 2;
    -ms-grid-row-span: 1;
    grid-row: 2 / 3;
  }
`;

export const DividerBack = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto;
  display: inline-block;
`;

export const Headers = styled.h2`
  max-width: 1100px;
  margin: auto;
  padding: 0.5em;
  background-color: ${props => props.theme.neutralLight};
  @media only screen and (max-width: 770px) {
    text-align: center;
  }
`;

export const EmptyText = styled.h4`
  max-width: 1100px;
  margin: auto;
  padding: 0.5em;
  @media only screen and (max-width: 770px) {
    text-align: center;
  }
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

export const MoreAssignmentsButton = styled(Button)`
  margin: auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
  a {
    color: ${props => props.theme.text};
  }
  :hover {
    a {
      color: white;
    }
  }
`;

export const MoreButton = styled(Button)`
  margin: auto auto 5px auto;
  display: block;
  width: 205px;
  border: 2px solid ${props => props.theme.primaryDark};
  a {
    color: ${props => props.theme.text};
  }
  :hover {
    a {
      color: white;
    }
  }
  @media only screen and (min-width: 1000px) {
    display: none;
  }
`;

export const LargeMoreButton = styled(Button)`
  display: table-cell;
  margin: 0 auto;
  z-index: 15;
  vertical-align: middle;
  height: 205px;
  width: 205px;
  max-width: 205px;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.neutralLight};
  border-radius: 100%;
  border: 2px solid ${props => props.theme.secondary};
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    background: ${props => props.theme.success};
  }
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

export const LikedIcon = styled.img`
  width: 28px;
  height: 28px;
`;
