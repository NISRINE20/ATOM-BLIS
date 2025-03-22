import styled from 'styled-components';
import { darken } from 'polished';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 1000;
  width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.5em;
  color: #333;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: span 2; /* Span both columns */
`;

export const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const ApplyButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: #28a745;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, '#28a745')};
  }
`;

export const CloseButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: #dc3545;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, '#dc3545')};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, '#007bff')};
  }
`;