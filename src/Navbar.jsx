import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Login</button>
    </div>
  )
}

export default Navbar;