import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#222', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '2rem', color: 'white', textDecoration: 'none' }}>
        Home
      </Link>
      <Link to="/profile" style={{ color: 'white', textDecoration: 'underline' }}>
        Ishmam
      </Link>
    </nav>
  );
};

export default NavBar;
