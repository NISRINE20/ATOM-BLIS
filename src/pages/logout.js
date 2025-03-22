import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon, Spinner, LoadingOverlay } from '../design/logoutdesign';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    // Simulate a delay for logging out
    setTimeout(() => {
      // Clear user data from local storage or any other storage
      localStorage.removeItem('email');
      // Redirect to login page
      navigate('/login');
    }, 2000); // Adjust the delay as needed
  };

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      <LogoutIcon onClick={handleLogout} disabled={isLoading}>
        <FaSignOutAlt />
      </LogoutIcon>
    </>
  );
};

export default Logout;