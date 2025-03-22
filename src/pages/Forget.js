import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, LoginBox, Title, ErrorMessage, Input, Button } from '../design/design';
import { Label, Link } from '../design/design';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Generate a verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Send the verification code to the user's email and store it in the backend
      const response = await fetch('https://vynceianoani.helioho.st/bliss/verification.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('A verification code has been sent to your email.');
        setError('');
        navigate('/verify-code', { state: { email } });
      } else {
        setError(data.error || 'Failed to send verification code');
        setMessage('');
      }
    } catch (error) {
      setError(error.message || 'Failed to send verification code');
      setMessage('');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>QuickShelf</Title>
        <p>FORGOT PASSWORD</p>
        {message && <p>{message}</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleForgotPassword}>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        <Link href="#" onClick={() => navigate('/login')}>Back to Login</Link>
      </LoginBox>
    </Container>
  );
}

export default ForgotPassword;