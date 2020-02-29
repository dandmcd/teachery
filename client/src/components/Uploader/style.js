import styled from "styled-components";

import Button from "../../theme/Button";

export const getColor = props => {
  if (props.isDragAccept) {
    return "#91d251";
  }
  if (props.isDragReject) {
    return "#d96e63";
  }
  if (props.isDragActive) {
    return "#1dc5c5";
  }
  return "#bdafaf";
};

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${props => props.theme.container};
  color: ${props => props.theme.textLight};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const UploadTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 0px;
`;

export const AcceptedList = styled.ul`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

export const AcceptedItem = styled.li`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

export const Aside = styled.aside`
  margin-bottom: 10px;
`;

export const RejectedList = styled.ul`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

export const RejectedFileWarning = styled.h4`
  color: ${props => props.theme.error};
  margin: 0;
  padding: 0;
`;

export const RejectedItem = styled.li`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
  font-size: 12px;
`;

export const ThumbContainer = styled.aside`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

export const ThumbInner = styled.div`
  display: flex;
  min-width: 0px;
  overflow: hidden;
`;

export const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

export const RemoveButton = styled(Button)`
  display: ${props => {
    if (props.files.length === 0) {
      return "none";
    } else {
      return "inline-table";
    }
  }};
`;
