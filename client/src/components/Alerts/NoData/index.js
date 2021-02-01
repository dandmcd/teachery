import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NoData = ({ title, message }) => {
  return (
    <Box>
      <Title>{title}</Title>
      <Label>
        <LabelName>{message}</LabelName>
      </Label>
    </Box>
  );
};

const Box = styled.div`
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.neutralLight};
  border-radius: 24px;
  text-align: center;
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
      0 6px 6px rgba(19, 129, 129, 0.125);
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 88%;
`;

const LabelName = styled.h4`
  font-weight: 600;
  margin: auto 1.5em auto 1.5em;
`;

NoData.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default NoData;
