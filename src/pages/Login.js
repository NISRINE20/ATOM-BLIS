import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Container, LoginBox, Title, ErrorMessage, Input, Button } from '../design/design';
import { Label, Link } from '../design/design';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://vynceianoani.helioho.st/bliss/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem('email', data.email);
      navigate('/user');
    } else {
      setError(data.error || 'Failed to login');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>QuickShelf</Title>
        <p>SIGN IN</p>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <Label>Username</Label>
          <Input
            type="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        <Link href="#">Forgot Username?</Link>
        <Link href="#" onClick={() => navigate('/forget')}>Forgot Password?</Link>
      </LoginBox>
    </Container>
  );
}

export default Login;