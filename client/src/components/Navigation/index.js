import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navigation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [displayMobileNavbar, setDisplayMobileNavbar] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", AutoHideMobileNavbar);
    return () => {
      window.removeEventListener("resize", AutoHideMobileNavbar);
    };
  });

  const toggleMobileNavbar = () => {
    setDisplayMobileNavbar(displayMobileNavbar === false ? true : false);
    setIsChecked(isChecked === false ? true : false);
    console.log(displayMobileNavbar);
  };

  const AutoHideMobileNavbar = () => {
    const screenWidth = window.innerWidth;

    if (displayMobileNavbar && screenWidth > 768) {
      setDisplayMobileNavbar(false);
    }
  };

  return (
    <Navbar>
      <DesktopNavbar
        isChecked={isChecked}
        toggleMobileNavbar={toggleMobileNavbar}
      />
      <MobileNavbar
        displayMobileNavbar={displayMobileNavbar}
        toggleMobileNavbar={toggleMobileNavbar}
      />
    </Navbar>
  );
};

const Navbar = styled.div``;

export default Navigation;
