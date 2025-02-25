import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/PATHS';

const About: React.FC = () => {
    return <div>
        <span>About Page</span>
        <Link to={HOME_ROUTE}>Home</Link>
    </div>;
};

export default About;
