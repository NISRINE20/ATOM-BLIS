import styled, { keyframes } from 'styled-components';

export const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #b22222;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 35px; /* Add this line to move the button higher */
  align-self: flex-end;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LogoutIcon = styled.div`
  font-size: 30px;
  color: #b22222;
  cursor: pointer;
  margin-bottom: 35px;
  margin-left: auto;
  transition: color 0.3s ease;

  &:hover {
    color: #c82333;
  }

  &:disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;