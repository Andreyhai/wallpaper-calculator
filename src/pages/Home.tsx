import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE } from '../utils/PATHS';

const Home: React.FC = () => {
    return <div>
        <span>Home Page</span>
        <Link to={ABOUT_ROUTE}>About</Link>
    </div>;
};

export default Home;