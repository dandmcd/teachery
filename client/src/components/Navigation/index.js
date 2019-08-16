import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = styled.div`
  overflow-x: hidden;
  width: 100%;
  position: fixed};
  top: 0;
  z-index: 20;
`;

const Navigation = () => {
  const [displayMobileNavbar, setDisplayMobileNavbar] = useState(false);
  const [scrollingLock, setScrollingLock] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", AutoHideMobileNavbar);

    return () => {
      window.removeEventListener("resize", AutoHideMobileNavbar);
    };
  });

  const toggleMobileNavbar = () => {
    setDisplayMobileNavbar(displayMobileNavbar === false ? true : false);
  };
  console.log(displayMobileNavbar);

  const AutoHideMobileNavbar = () => {
    const screenWidth = window.innerWidth;

    if (displayMobileNavbar && screenWidth > 768) {
      setDisplayMobileNavbar(false);
    }
  };

  return (
    <Navbar>
      <DesktopNavbar toggleMobileNavbar={toggleMobileNavbar} />
      <MobileNavbar
        displayMobileNavbar={displayMobileNavbar}
        setDisplayMobileNavbar={setDisplayMobileNavbar}
      />
    </Navbar>
  );
};

export default Navigation;
