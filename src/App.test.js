import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import user from 'axios';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  user.post.mockImplementationOnce(() =>
    Promise.resolve({
      "data": {
        "total_categories": 1,
        "categories": [
          {
            "id": 21,
            "name": "category name",
            "description": "category description",
          }
        ]
      }
    })
  );
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

