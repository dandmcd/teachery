import styled from "styled-components";
import Button from "../../../../theme/Button";

export const Header = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

export const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto auto;
  gap: 5px 5px;
  grid-template-areas:
    "img title"
    "img desc"
    "img cards";
  max-width: 1100px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  grid-area: title;
  margin: 0.2em auto 0.2em 0.2em;
  margin-left: 0.2em;
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-decoration: underline;
  -webkit-text-decoration-color: ${(props) => props.theme.primary};
  text-decoration-color: ${(props) => props.theme.primary};
`;

export const Description = styled.h3`
  grid-area: desc;
  margin-left: 0.2em;
  line-height: 1;
`;

export const AddCardButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondary};
`;

export const DeckCards = styled.div`
  grid-area: cards;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const CardCount = styled.div`
  padding: 0.3em 0;
`;

export const CardCountButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 40px;
  width: 40px;
  max-width: 40px;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
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
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    background: ${(props) => props.theme.secondaryDark};
  }
`;

export const DeckImg = styled.div`
  grid-area: img;
  background-image: url(${(props) => props.deckImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: none;
  /* width: 330px;
height: 200px; */
  background-color: ${(props) => props.theme.container};
`;
