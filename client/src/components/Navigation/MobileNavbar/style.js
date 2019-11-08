import styled from "styled-components";

export const Navbar = styled.nav`
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  top: 60px;
  margin-top: 0px;
  width: 100%;
  background: white;
  align-self: flex-end;
  z-index: ${props => (props.displayMobileNavbar ? 20 : 1)};
  transition: transform 1s;
  transform: translateX(
    ${props => (props.displayMobileNavbar ? "0%" : "calc(100% + 15px)")}
  );
`;

export const NavRight = styled.div`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  list-style: none;
`;

export const NavLinks = styled.ul`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
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
    color: ${props => props.theme.primary};
    :hover {
      bottom: -5px;
      border-radius: 6px;
      background: #f9f9f9;
      height: 4px;
      transition-property: width;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
  }
`;
