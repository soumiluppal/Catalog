import React from 'react';
import ReactDOM from 'react-dom';
import { CatSearch } from '..';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const categories = [
    {
        "id": 1,
        "name": "Test category 1",
        "description": "category description",
        "created": "2015-08-05T08:40:51.620Z",
        "updated": "2018-04-03T08:40:51.620Z"
    },
    {
        "id": 2,
        "name": "Test category 2",
        "description": "category description",
        "created": "2015-08-05T08:40:51.620Z",
        "updated": "2018-04-03T08:40:51.620Z"
    },
    {
        "id": 3,
        "name": "Test category 3",
        "description": "category description",
        "created": "2015-08-05T08:40:51.620Z",
        "updated": "2018-04-03T08:40:51.620Z"
    }
]

describe("Category search list tests", () => {
    it('Category search bar renders without crashing', async () => {
        const props = {
            categories: categories
        }
        const wrapper = await shallow(
            <CatSearch {...props} />
        );
        expect(wrapper.find('.mb-3').exists()).toBe(true);
    });

    it('Display list of 3 categories on focus', async () => {
        const props = {
            selection: jest.fn(),
            getCategories: jest.fn(),
            categories: categories
        }
        const wrapper = await shallow(
            <CatSearch {...props} />
        );
        wrapper.setState({
            show: true
        });
        wrapper.update();
        expect(wrapper.find('DropdownItem').length).toBe(3);
    });
});
