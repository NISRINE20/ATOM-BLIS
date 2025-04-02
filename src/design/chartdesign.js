import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';

export const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column; /* Change to column to stack items vertically */
  align-items: center;
  padding: 15px;
  background-color: white;
  border-bottom: 2px solid black;
  position: relative; /* Ensures absolute positioning works */
`;
export const MenuBar = styled.div`
  background-color: #b22222;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h1`
  font-weight: bold;
`;

export const DownloadIcon = styled(FaDownload)`
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-left: auto;

  &:hover {
    color: #FFD700; /* Gold */
  }
`;

export const ChartContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  overflow-y: auto; /* Enable vertical scrolling for the chart content */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for WebKit browsers */
  }
`;
export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${props => (props.primary ? '#1E90FF' : '#ccc')};
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.primary ? '#1C86EE' : '#bbb')};
  }
`;