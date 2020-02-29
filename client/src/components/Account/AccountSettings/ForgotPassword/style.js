import styled from "styled-components";
import Button from "../../../../theme/Button";

export const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export const SignInHeader = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

export const Box = styled.form`
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.neutralLight};
  border-radius: 24px;
  text-align: center;
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 600;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  margin: 0 auto;
  width: 88%;
`;

export const LabelName = styled.h4`
  font-weight: 600;
  margin: auto 1.5em auto 1.5em;
`;

export const Span = styled.span``;

export const InputUserName = styled.input`
  font-family: "Open Sans", sans-serif;
  border: 0;
  background-color: ${props => props.theme.container};
  display: block;
  margin: 3px auto 17px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 88%;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 90%;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputPassword = styled.input`
  font-family: "Open Sans", sans-serif;
  border: 0;
  background-color: ${props => props.theme.container};
  display: block;
  margin: 3px auto 17px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 88%;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 90%;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputConfirmPassword = styled.input`
  font-family: "Open Sans", sans-serif;
  border: 0;
  background-color: ${props => props.theme.container};
  display: block;
  margin: 3px auto 17px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondaryDark};
  padding: 14px 10px;
  width: 88%;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 90%;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const SubmitButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;
