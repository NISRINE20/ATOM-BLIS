import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, LoginBox, Title, ErrorMessage, Input, Button } from '../design/design';
import { Label, Link } from '../design/design';

function ResetPassword() {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Verify the code and update the password in the backend (e.g., PHP on XAMPP)
      const response = await fetch('https://vynceianoani.helioho.st/bliss/reset.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Your password has been reset successfully.');
        setError('');
        navigate('/login');
      } else {
        setError(data.error || 'Failed to reset password');
        setMessage('');
      }
    } catch (error) {
      setError(error.message || 'Failed to reset password');
      setMessage('');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>QuickShelf</Title>
        <p>RESET PASSWORD</p>
        {message && <p>{message}</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleResetPassword}>
          <Label>Verification Code</Label>
          <Input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        <Link href="#" onClick={() => navigate('/login')}>Back to Login</Link>
      </LoginBox>
    </Container>
  );
}

export default ResetPassword;