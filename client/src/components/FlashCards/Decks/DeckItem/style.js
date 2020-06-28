import styled from "styled-components";
import Button from "../../../../theme/Button";

export const DeckItemContainer = styled.div`
  position: relative;
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
  -ms-grid-rows: 200px 150px 1fr 46px;
  grid-template-rows: 200px 150px 1fr 46px;
  -ms-grid-columns: 110px 110px 110px;
  grid-template-columns: repeat(3, 110px);
  -webkit-box-pack: start start;
  -ms-flex-pack: start start;
  justify-content: start start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
`;

export const DeckImg = styled.div`
  background-image: url(${(props) => props.deckImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: none;
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  width: 330px;
  height: 200px;
  background-color: ${(props) => props.theme.container};
`;

export const DeckInfo = styled.div`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 60px 1fr;
  grid-template-rows: 60px 1fr;
  -ms-grid-columns: 1fr;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.container};
  border-style: inset;
  border-width: 0px 2px 0px 0px;
  -o-border-image: linear-gradient(
      to top,
      ${(props) => props.theme.neutralLight},
      ${(props) => props.theme.container}
    )
    1 100%;
  border-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(${(props) => props.theme.neutralLight}),
      ${(props) => props.theme.container}
    )
    1 100%;
  border-image: linear-gradient(
      to top,
      ${(props) => props.theme.neutralLight},
      ${(props) => props.theme.container}
    )
    1 100%;
`;

export const Title = styled.h3`
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-decoration: underline;
  -webkit-text-decoration-color: ${(props) => props.theme.primary};
  text-decoration-color: ${(props) => props.theme.primary};
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  -ms-grid-column-align: stretch;
  justify-self: stretch;
  -ms-grid-row-align: stretch;
  align-self: stretch;
  a {
    color: ${(props) => props.theme.text};
    -webkit-text-decoration-color: ${(props) => props.theme.primary};
    text-decoration-color: ${(props) => props.theme.primary};
  }
`;

export const Description = styled.p`
  font-size: 14px;
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
`;

export const CreatedItem = styled.div`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
  grid-column: 3 / 4;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 20px 20px 1fr;
  grid-template-rows: 20px 20px 1fr;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  padding: 3px;
  background-color: ${(props) => props.theme.container};
`;

export const CreatedBy = styled.h6`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

export const CreatedOn = styled.h6`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

export const Tags = styled.div`
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  text-indent: 2px;
  @supports (display: grid) {
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
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
  a {
    font-size: 0.7em;
    color: ${(props) => props.theme.primaryMed};
    :hover {
      color: ${(props) => props.theme.primary};
    }
  }
`;

export const Practice = styled.div`
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  grid-column: 1 / 4;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 45px 20px 75px;
  grid-template-rows: 45px 20px 75px;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px outset ${(props) => props.theme.neutralLight};
`;

export const PracticeText = styled.h3`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-column: 1 / 3;
  margin: 0px 0px 0px 5px;
  -ms-grid-column-align: start;
  justify-self: start;
  -ms-grid-row-align: center;
  align-self: center;
`;

export const PracticeInstruct = styled.p`
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  grid-row: 2 / 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  grid-column: 1 / 4;
  margin: 0px 0px 0px 5px;
  font-size: 0.75em;
  font-style: italic;
`;

export const PracticeCardCount = styled.h4`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
  grid-column: 3 / 4;
  margin: 0;
  -ms-grid-column-align: center;
  justify-self: center;
  -ms-grid-row-align: center;
  align-self: center;
  a {
    color: ${(props) => props.theme.secondaryDark};
  }
`;

export const PracticeForm = styled.form`
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  grid-column: 1 / 4;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 110px 110px 110px;
  grid-template-columns: repeat(3, 110px);
  -ms-grid-rows: 60px;
  grid-template-rows: 60px;
  margin-top: 3px;
`;

export const PracticeInput = styled.input`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-column: 1 / 2;
  margin: 0 auto;
  vertical-align: middle;
  height: auto;
  width: 60px;
  max-width: 60px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -moz-appearance: textfield;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-filter: brightness(102%);
    filter: brightness(102%);
    background-color: ${(props) => props.theme.secondaryDark};
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  ::placeholder {
    color: white;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PracticeAll = styled.button`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
  margin: 0 auto;
  vertical-align: middle;
  height: auto;
  width: 60px;
  max-width: 60px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-filter: brightness(102%);
    filter: brightness(102%);
    background-color: ${(props) => props.theme.secondaryDark};
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

export const PracticeStart = styled.button`
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  grid-row: 1 / 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
  grid-column: 3 / 4;
  margin: 0 auto;
  vertical-align: middle;
  height: auto;
  width: 60px;
  max-width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 100%;
  -webkit-box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
  box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
  text-align: center;
  padding: 0;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  -webkit-transform: scale(1) translateZ(0);
  transform: scale(1) translateZ(0);
  :hover {
    -webkit-filter: brightness(102%);
    filter: brightness(102%);
    background-color: ${(props) => props.theme.secondaryDark};
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  :disabled {
    background-color: ${(props) => props.theme.neutralLight};
    border: 2px solid ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.disabled};
    -webkit-box-shadow: 0 0 10px 5px ${(props) => props.theme.neutralLight};
    box-shadow: 0 0 10px 5px ${(props) => props.theme.neutralLight};
    cursor: auto;
  }
`;

export const DeckButtons = styled.div`
  -ms-grid-row: 4;
  -ms-grid-row-span: 1;
  grid-row: 4 / 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  grid-column: 1 / 4;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 1fr;
  grid-template-rows: 1fr;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: end;
  justify-items: center;
  cursor: pointer;
  border-top: 2px outset ${(props) => props.theme.neutralLight};
`;

export const ManageButton = styled(Button)`
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  display: inherit;
  border: 2px solid ${(props) => props.theme.secondaryDark};
  min-height: 40px;
  margin: 0.1em;
  :disabled {
    border: 2px solid ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.disabled};
    cursor: auto;
    :hover {
      background-color: ${(props) => props.theme.neutralLight};
    }
  }
`;

export const EditButton = styled(Button)``;

export const TagButton = styled(Button)``;

export const BrowseButton = styled(Button)`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  min-height: 40px;
  margin: 0.1em;
  border: 2px solid ${(props) => props.theme.secondaryDark};
  a {
    color: ${(props) => props.theme.text};
  }
  :hover {
    a {
      color: white;
    }
  }
`;

export const Like = styled.div`
  display: inherit;
  -ms-grid-row: 1;
  -ms-grid-column: 3;
`;

export const LikeButton = styled(Button)`
  margin: 0.1em;
  min-height: 40px;
  border: 2px solid ${(props) => props.theme.secondaryDark};
`;

export const AddCardButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondaryDark};
`;

export const AddTagButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondary};
  :hover {
    background: ${(props) => props.theme.secondaryDark};
  }
`;
