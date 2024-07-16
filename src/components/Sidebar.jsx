import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>&times;</button>
      <nav>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Inicio</Link></li>
          <li><Link to="/reserve" onClick={toggleSidebar}>Reservar</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>Acerca de</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
