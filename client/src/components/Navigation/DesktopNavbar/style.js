import styled from "styled-components";

export const Navbar = styled.nav`
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 20;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: auto;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: ${props => props.theme.appBody};
  /* box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1); */
`;

export const NavLeft = styled.div`
  position: relative;
  z-index: 20;
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
  margin-left: 10px;
  text-align: left;
  font-size: 36px;
  font-weight: lighter;
`;

export const NavRight = styled.div`
  position: relative;
  z-index: 20;
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
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  text-align: right;
  font-size: 0.8rem;
  margin-right: 10px;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuToggle = styled.div`
  @media all and (max-width: 48em) {
    display: block;
    position: relative;
    z-index: 30;
    -webkit-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MenuButton = styled.input`
  position: relative;
  z-index: 30;
  display: block;
  background-color: blue;
  margin-right: 10px;
  width: 42px;
  height: 34px;
  top: -7px;
  left: -8px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  -webkit-touch-callout: none;
  :checked ~ span:nth-last-child(2) {
    opacity: 1;
    -webkit-transform: rotate(0deg) scale(1.2, 1.2) translate(0px, 0px);
    transform: rotate(0deg) scale(1.2, 1.2) translate(0px, 0px);
    background: ${props => props.theme.text};
  }
  :checked ~ span:nth-last-child(1) {
    opacity: 0;
    -webkit-transform: rotate(0deg) scale(0.2, 0.2);
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  :checked ~ span:nth-last-child(3) {
    opacity: 0;
    -webkit-transform: rotate(0deg) scale(0.2, 0.2);
    transform: rotate(0deg) scale(0.2, 0.2);
  }
`;

export const MenuSpan = styled.span`
  @media (max-width: 768px) {
    display: block;
    width: 33px;
    height: 4px;
    margin-right: 10px;
    margin-bottom: 5px;
    position: relative;
    z-index: 20;
    background: ${props => props.theme.link};
    border-radius: 3px;
    -webkit-transform-origin: 4px 0px;
    transform-origin: 4px 0px;
    -webkit-transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      opacity 0.55s ease,
      -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      opacity 0.55s ease,
      -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease,
      -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    :first-child {
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    :nth-last-child(2) {
      -webkit-transform-origin: 0% 100%;
      transform-origin: 0% 100%;
    }
  }
`;

export const NavLinks = styled.ul`
  position: relative;
  z-index: 20;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  list-style: none;
`;

export const NavLink = styled.li`
  font-size: 16px;
  position: relative;
  z-index: 20;
  text-decoration: none;
  margin: 0 0.7em;
  a {
    color: ${props => props.theme.link};
    :hover {
      bottom: -5px;
      border-radius: 6px;
      background: ${props => props.theme.neutralLight};
      height: 4px;
      -webkit-transition-property: width;
      transition-property: width;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }
  }
`;
