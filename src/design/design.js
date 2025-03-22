import styled, { keyframes } from 'styled-components';


export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Background = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  animation: ${fadeIn} 1s ease-in;
`;

export const WelcomeMessage = styled.h2`
  color: #333;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('/s.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


export const LoginBox = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  border: 1px solid black;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  color:black;
  font-weight: bold;
`;

export const Label = styled.p`
  text-align: left;
  font-weight: bold;
  margin: 10px 0 5px;
`;

export const Input = styled.input`
  width: 93%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background:rgb(172, 2, 2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background:rgb(255, 91, 91);
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export const Link = styled.a`
  display: block;
  color: blue;
  margin-top: 10px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;