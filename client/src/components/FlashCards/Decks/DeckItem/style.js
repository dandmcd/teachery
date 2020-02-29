import styled from "styled-components";
import Button from "../../../../theme/Button";

export const DeckItemContainer = styled.div`
  position: relative;
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
  grid-template-rows: 200px 150px 1fr 40px;
  grid-template-columns: repeat(3, 110px);
  justify-content: start start;
  align-content: flex-start;
`;

export const DeckImg = styled.img`
  object-fit: cover;
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  width: 330px;
  height: 200px;
  background-color: ${props => props.theme.container};
`;

export const DeckInfo = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.container};

  border-style: inset;
  border-width: 0px 2px 0px 0px;
  border-image: linear-gradient(
      to top,
      ${props => props.theme.neutralLight},
      ${props => props.theme.container}
    )
    1 100%;
`;

export const Title = styled.h3`
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.primary};
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
  justify-self: stretch;
  align-self: stretch;
  a {
    color: ${props => props.theme.text};
    text-decoration-color: ${props => props.theme.primary};
  }
`;

export const Description = styled.p`
  font-size: 14px;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  margin: 0px 0px 0px 5px;
`;

export const CreatedItem = styled.div`
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  display: grid;
  grid-template-rows: 20px 20px 1fr;
  grid-template-columns: 1fr 1fr;
  padding: 3px;
  background-color: ${props => props.theme.container};
`;

export const CreatedBy = styled.h6`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  margin: 0;
  color: ${props => props.theme.text};
`;

export const CreatedOn = styled.h6`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin: 0;
  color: ${props => props.theme.text};
`;

export const Tags = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 3;
  text-indent: 2px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  a {
    font-size: 0.7em;
    color: ${props => props.theme.primaryMed};
    :hover {
      color: ${props => props.theme.primary};
    }
  }
`;

export const Practice = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 4;

  box-shadow: 0 2px 6px -6px black;
  display: grid;
  grid-template-rows: 45px 20px 75px;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px outset ${props => props.theme.neutralLight};
`;

export const PracticeText = styled.h3`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  margin: 0px 0px 0px 5px;
  justify-self: start;
  align-self: center;
`;

export const PracticeInstruct = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / 4;
  margin: 0px 0px 0px 5px;
  font-size: 0.75em;
  font-style: italic;
`;

export const PracticeCardCount = styled.h4`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  margin: 0;
  justify-self: center;
  align-self: center;
  a {
    color: ${props => props.theme.secondaryDark};
  }
`;

export const PracticeForm = styled.form`
  grid-row: 3 / 4;
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: repeat(3, 110px);
  grid-template-rows: 60px;
  margin-top: 3px;
`;

export const PracticeInput = styled.input`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 0 auto;
  display: table-cell;
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
  background-color: ${props => props.theme.secondary};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    filter: brightness(105%);
    background-color: ${props => props.theme.secondaryDark};
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
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  margin: 0 auto;
  display: table-cell;
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
  background-color: ${props => props.theme.secondary};
  border-radius: 100%;
  text-align: center;
  padding: 0;
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    filter: brightness(105%);
    background-color: ${props => props.theme.secondaryDark};
    transform: scale(1.1);
  }
`;

export const PracticeStart = styled.button`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  margin: 0 auto;
  display: table-cell;
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
  background-color: ${props => props.theme.secondary};
  border-radius: 100%;
  box-shadow: 0 0 10px 5px ${props => props.theme.success};
  text-align: center;
  padding: 0;
  transition: all 0.25s ease-in-out;
  transform: scale(1) translateZ(0);
  :hover {
    filter: brightness(105%);
    background: ${props => props.theme.secondaryDark};
    transform: scale(1.1);
  }
  :disabled {
    background-color: ${props => props.theme.neutralLight};
    border: 2px solid ${props => props.theme.disabled};
    color: ${props => props.theme.disabled};
    box-shadow: 0 0 10px 5px ${props => props.theme.neutralLight};
  }
`;

export const DeckButtons = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 4;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 0% 0% 10px 10px;
  cursor: pointer;
`;

export const ManageButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export const BrowseButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
  a {
    color: ${props => props.theme.text};
  }
  :hover {
    a {
      color: white;
    }
  }
`;

export const LikeButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export const AddCardButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;

export const AddTagButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondary};
  :hover {
    background: ${props => props.theme.secondaryDark};
  }
`;
