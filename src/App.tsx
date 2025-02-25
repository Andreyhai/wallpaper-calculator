// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import { ABOUT_ROUTE, HOME_ROUTE } from './utils/PATHS';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={ABOUT_ROUTE} element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;