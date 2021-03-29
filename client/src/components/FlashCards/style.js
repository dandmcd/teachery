import styled from "styled-components";
import Button from "../../theme/Button";

export const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export const FlashCardHeader = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0.2em 0px 0.2em 12px;
  @media only screen and (max-width: 675px) {
    text-align: center;
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const CreateButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondary};
  width: 175px;
`;
