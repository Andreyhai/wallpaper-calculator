import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return <div>
    <span>Home Page</span>
    <Link to="/about">About</Link>
    </div>;
};

export default Home;