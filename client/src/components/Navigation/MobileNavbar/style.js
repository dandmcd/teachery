import styled from "styled-components";

export const Navbar = styled.nav`
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  top: 60px;
  margin-top: 0px;
  width: 100%;
  background-color: ${props => props.theme.appBody};
  -ms-flex-item-align: end;
  align-self: flex-end;
  z-index: ${props => (props.displayMobileNavbar ? 20 : 15)};
  -webkit-transition: -webkit-transform 1s;
  transition: -webkit-transform 1s;
  transition: transform 1s;
  transition: transform 1s, -webkit-transform 1s;
  -ms-transform: translateX(-100%);
  -webkit-transform: translateX(
    ${props => (props.displayMobileNavbar ? "0%" : "calc(100% + 15px)")}
  );
  transform: translateX(
    ${props => (props.displayMobileNavbar ? "0%" : "calc(100% + 15px)")}
  );
`;

export const NavRight = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  list-style: none;
`;

export const NavLinks = styled.ul`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  list-style: none;
  margin: 0 5px;
  padding: 0px;
`;

export const NavLink = styled.li`
  font-size: 16px;
  position: relative;
  text-decoration: none;
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
