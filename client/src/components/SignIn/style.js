import styled from "styled-components";
import Button from "../../theme/Button";

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
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #281e1d;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: #2ecc71;
  }
`;

export const InputPassword = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #281e1d;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  border-radius: 24px;
  transition: 0.25s;
  :focus {
    width: 280px;
    border-color: #2ecc71;
  }
`;

export const SubmitButton = styled(Button)``;
