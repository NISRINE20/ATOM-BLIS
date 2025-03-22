import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 700px;
`;

export const ModalContent1 = styled.div`
  background: white;
  border-radius: 10px;
  width: 700px;
  padding: 30px;
`;


export const ModalHeader = styled.h2`
  margin-top: 0;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
  padding: 40px;
`;

export const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

export const Select = styled.select`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  grid-column: span 2;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#28a745' : '#dc3545'};
  color: white;
  margin-left: ${props => props.primary ? '10px' : '0'};
`;