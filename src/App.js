import React, { Component } from 'react';
import './styles/style.css';
import Main from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import catReducer from './reducers/categories.reducer';
import { BrowserRouter } from 'react-router-dom';

const catStore = createStore(catReducer);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={catStore}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
