import styled from "styled-components";
import Button from "../../../../theme/Button";

export const ViewButtonWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

export const ViewBookmarkDecksButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondaryDark};
  width: 175px;
  -ms-flex-item-align: end;
  align-self: flex-end;
`;

export const MobileBookmarkButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.neutralLight};
  height: 36;
  :hover {
    color: white;
    background: ${(props) => props.theme.neutralLight};
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  @media only screen and (max-width: 480px) {
    width: 75px;
  }
`;

export const Flex = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  align-items: center;
`;

export const LikeIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 0.5em;
  @media only screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
  }
`;
