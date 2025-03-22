import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Title, Input, Button } from '../design/registrationdesign';
import useConsolePasscode from '../component/PasscodePrompt';

const Registration = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isPasscodeCorrect = useConsolePasscode('hcdcsample', () => {
    console.log('Passcode correct');
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://vynceianoani.helioho.st/bliss/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, position, email, password }),
    });

    if (response.ok) {
      navigate('/');
    } else {
      console.error('Failed to register');
    }
  };

  if (!isPasscodeCorrect) {
    return null;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Registration;