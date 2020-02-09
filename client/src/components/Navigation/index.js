import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import useWindowDimensions from "../../utilities/useWindowDimensions";

const Navigation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [displayMobileNavbar, setDisplayMobileNavbar] = useState(false);

  const { width } = useWindowDimensions();

  const toggleMobileNavbar = () => {
    setDisplayMobileNavbar(displayMobileNavbar === false ? true : false);
    setIsChecked(isChecked === false ? true : false);
  };

  useEffect(() => {
    if (displayMobileNavbar && width > 768) {
      setDisplayMobileNavbar(false);
    }
  }, [displayMobileNavbar, width]);

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
