import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;09
  justify-content: center;
  height: 100vh;
  background-color: #e9ecef;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

export const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 24px;
  color: #343a40;
  text-align: center;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #495057;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;