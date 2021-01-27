import styled from "styled-components";

import Button from "../../../theme/Button";
import noise from "../../../assets/noisy-texture.png";
import darkNoise from "../../../assets/dark-noisy-texture.png";

export const ImgContainer = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
`;

export const Featured = styled.h1`
  width: 80%;
  text-align: center;
  font-weight: 200;
  line-height: 1.8em;
  margin: 0 auto;
  color: ${(props) => props.theme[props.inputColor] || props.theme.secondary};
`;

export const FeatureCatchAll = styled.h2`
  width: 80%;
  text-align: center;
  font-weight: 200;
  line-height: 1.8em;
  margin: 0 auto;
`;

export const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  color: ${(props) => props.theme[props.inputColor] || props.theme.textLight};
  line-height: 1.6em;
  margin: 0.8em auto;
`;

export const FeatureContainer = styled.div`
  margin: 0 auto;
  padding: 3em 0 3em 0;
  position: relative;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.appBody};
`;

export const ImgShadow = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
  border-radius: 5px;
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: ${(props) =>
      props.boxShadow || "inset 0px 20px 50px 50px rgba(255, 255, 255, 1)"};
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
    ${(props) => props.theme.neutralLight},
    ${(props) => props.theme.container}
  );
`;

export const Header = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

export const HeaderExplore = styled.div`
  opacity: ${(props) => (props.toggleExplore ? 1 : 0.1)};
  background-clip: border-box;
  background-image: ${(props) =>
    props.localTheme === "dark" ? `url(${darkNoise})` : `url(${noise})`};
  width: 100%;
  margin: auto auto ${(props) => (props.toggleExplore ? "5em" : 0)} auto;
  display: inline-block;
  background-color: ${(props) => props.theme.neutralLight};
  transition: all 1s linear;
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
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  padding-top: 2em;
  margin: 0 auto;
  background-repeat: repeat;
  background-size: 100px 100px;
  background-image: ${(props) =>
    props.localTheme === "dark" ? `url(${darkNoise})` : `url(${noise})`};
  @media only screen and (max-width: 675px) {
    margin: 2em auto;
  }
`;

export const ExploreMenu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  max-width: 1100px;
  padding: 2em 0;
  margin: 0 auto;
  border-radius: 4px;
  background-color: ${(props) => props.theme.appBody};
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0.5em;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  padding: 0.5em;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export const CTAButton = styled(Button)`
  width: auto;
  font-size: 24px;
  background-color: ${(props) => props.theme.appBody};
  margin: 2.5em 0.2em 0.8em 0.2em;
`;

export const Explore = styled.div`
  margin: 1.5em auto 0 auto;
  cursor: ${(props) => props.cursor || "default"};
`;

export const ExploreH3 = styled.h3`
  margin: 0 auto;
  font-size: 22px;
  padding: 0.3em;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.primaryDark};
  :hover {
    color: ${(props) => props.hoverColor || props.theme.primaryDark};
  }
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export const ExploreH3Top = styled(ExploreH3)`
  font-size: 24px;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
  :hover {
    opacity: 0.5;
  }
`;

export const ArrowDown = styled.i`
  z-index: 15;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  ${Explore}:hover & {
    -webkit-transform: scale(1.1);
    transform: all scale(1.1);
  }
  ::after,
  ::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 4px;
  }
  ::after {
    width: 8px;
    height: 8px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(-45deg);
    left: 7px;
  }
  ::before {
    width: 2px;
    height: 20px;
    left: 10px;
    background: ${(props) => props.theme.primaryDark};
  }
`;
export const StudentButton = styled(Button)`
  font-size: 22px;
  font-weight: 600;
  z-index: 16;
  position: absolute;
  top: 65%;
  left: 50%;
  padding: inherit;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 2px solid ${(props) => props.theme.primaryLight};
  background-color: rgba(255, 255, 255, 0.7);
  :hover {
    color: white;
    background: ${(props) => props.theme.secondary};
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

export const TeacherButton = styled(Button)`
  font-size: 22px;
  font-weight: 600;
  z-index: 16;
  position: absolute;
  top: 65%;
  left: 50%;
  padding: inherit;
  transform: translate(-50%, -50%);
  width: 80%;

  border: 2px solid ${(props) => props.theme.primaryLight};
  background-color: rgba(255, 255, 255, 0.7);
  :hover {
    color: white;
    background: ${(props) => props.theme.secondary};
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

export const ButtonUnderlayImg = styled.img`
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  width: 95%;
  border-radius: ${(props) => (props.student ? "4px 0 0 4px" : "0 4px 4px 0")};
  filter: ${(props) => (props.toggleExplore ? "blur(0)" : "blur(3px)")};
`;

export const Img = styled.img`
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  width: 95%;
  border-radius: 5px;
`;
