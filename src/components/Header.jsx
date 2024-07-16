import React from 'react';
import '../styles/components/Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="menu-button" onClick={toggleSidebar}>&#9776;</button>
      <h1>MoveWise</h1>
    </header>
  );
};

export default Header;
