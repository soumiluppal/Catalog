import React, { Component } from 'react';
import './styles/style.css';
import Main from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import catReducer from './reducers/categories.reducer';

const catStore = createStore(catReducer);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={catStore}>
        <Main />
      </Provider>
    );
  }
}

export default App;
