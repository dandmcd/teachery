import styled from "styled-components";

export const SearchContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0px 0px 5px 12px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: ${(props) => props.theme.neutralLight};
`;
export const SearchImg = styled.img`
  height: 15px;
  width: 15px;
`;

export const SearchInput = styled.input`
  height: 35px;
  width: 180px;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.neutralLight};
`;

export const NoResult = styled.p`
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  text-indent: 0.5em;
  margin: 0 auto;
`;
