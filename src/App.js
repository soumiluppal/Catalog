import React, { Component } from 'react';
import './styles/style.css';
import Main from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom';

const rootStore = createStore(rootReducer);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={rootStore}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
