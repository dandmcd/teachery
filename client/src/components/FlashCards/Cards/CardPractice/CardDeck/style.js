import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  position: relative;
`;

export const Box = styled.div``;

export const CardImg = styled.img`
  left: 25%;
  right: 25%;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.primaryDark};
  max-height: 50vh;
  max-width: 50vh;
  height: auto;
  @media only screen and (max-device-width: 480px) {
    max-height: 30vh;
    max-width: 30vh;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: block;
  position: fixed;
  height: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.neutralLight};
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const Hr = styled.hr`
  padding: 0;
  border: none;
  height: 2px;
  background-image: -webkit-linear-gradient(
    left,
    ${(props) => props.theme.neutralLight},
    ${(props) => props.theme.container}
  );
  -webkit-animation: fadeInAnimation ease 1.5s;
  animation: fadeInAnimation ease 1.5s;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const CardFront = styled.h2`
  -webkit-animation: fadeInAnimation ease 1.5s;
  animation: fadeInAnimation ease 1.5s;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const CardBack = styled.h2`
  -webkit-animation: fadeInAnimation ease 1.5s;
  animation: fadeInAnimation ease 1.5s;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const FooterLeft = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: left;
  margin-left: 15px;
`;

export const FooterRight = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: right;
  margin-right: 15px;
`;

export const CorrectButton = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  max-width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.success};
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
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const WrongButton = styled.button`
  z-index: 50;
  margin: 0 auto;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  max-width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.error};
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
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const BigButtonDiv = styled.div`
  z-index: 30;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 30px;
`;

export const ShowAnswer = styled.button`
  height: 120px;
  width: 120px;
  max-width: 120px;
  font-size: 20px;
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
  ::first-letter {
    text-decoration: ${(props) => (props.isFlipped ? "" : "underline")};
  }
  :hover {
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
    -webkit-box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
    box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
  }
  :active {
    -webkit-filter: brightness(105%);
    filter: brightness(105%);
    -webkit-box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
    box-shadow: 0 0 10px 5px ${(props) => props.theme.success};
  }
`;

export const FinishCorrect = styled.button`
  margin: 0 auto;
  z-index: 50;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  max-width: 60px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.success};
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
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;

export const FinishWrong = styled.button`
  z-index: 50;
  margin: 0 auto;
  vertical-align: middle;
  height: 60px;
  width: 60px;
  max-width: 60px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  border-style: none;
  color: white;
  background-color: ${(props) => props.theme.error};
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
  }
  :active {
    -webkit-filter: brightness(115%);
    filter: brightness(115%);
  }
`;
