import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Call the server-side logout endpoint
        await axios.post('http://127.0.0.1:8000/api/logout');

        // Clear the JWT from cookies
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirect to the home page or login page
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle any logout failure as needed
      }
    };

    logout();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
