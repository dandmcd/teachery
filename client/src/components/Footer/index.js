import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Div>
      © Copyright 2020 Teachery |{" "}
      <a
        href="https://github.com/givionte/teachery"
        rel="noopener noreferrer"
        target="_blank"
      >
        Github Source
      </a>{" "}
      | Designed by{" "}
      <a
        href="https://www.danielmcdermott.me/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Daniel McDermott
      </a>
    </Div>
  );
};

const Div = styled.div`
  margin-top: 2em;
  text-align: center;
  color: ${(props) => props.theme.textLight};
  text-shadow: 0 1px rgba(255, 255, 255, 0.1);
`;

export default Footer;
