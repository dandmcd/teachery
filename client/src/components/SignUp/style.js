import styled from "styled-components";
import Button from "../../theme/Button";

export const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export const SignUpHeader = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

export const Box = styled.form`
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f4f4f4;
  border-radius: 24px;
  text-align: center;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 600;
`;

export const InputUserName = styled.input`
  border: 0;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputEmail = styled.input`
  border: 0;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondary};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputPassword = styled.input`
  border: 0;
  background: none;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondaryDark};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const InputConfirmPassword = styled.input`
  border: 0;
  background-color: #fff;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid ${props => props.theme.secondaryDark};
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: ${props => props.theme.secondaryLight};
  }
`;

export const SubmitButton = styled(Button)`
  border: 2px solid ${props => props.theme.secondaryDark};
`;
