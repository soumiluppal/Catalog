import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './common';
import Home from './components/Home';

import './styles/style.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
