import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h2>Bienvenido a MoveWise</h2>
      <p>La mejor opción para tus mudanzas y transportes.</p>
      <Link to="/reserve">
        <button>Reservar</button>
      </Link>
    </div>
  );
};

export default Home;
