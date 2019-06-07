import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './common';
import Home from './components/Home';
import { createStore } from 'redux';
import catReducer from './reducers/categories.reducer';

import './styles/style.css';

const store = createStore(catReducer);

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
