import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { HOME_ROUTE } from './utils/PATHS';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;