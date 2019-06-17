import React from 'react';
import ReactDOM from 'react-dom';
import { CatList } from '..';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Category selection tests", () => {
    it('Category selection component renders without crashing', async () => {
        const props = {
            user_id: 1
        }
        const wrapper = await shallow(
            <CatList {...props} />
        );
        expect(wrapper.find('.page-btn-div').exists()).toBe(true);
    });

    it('Functions setting state properly', async () => {
        const props = {
            user_id: 1
        }
        const wrapper = await shallow(
            <CatList {...props} />
        );
        wrapper.instance().selection(2);
        wrapper.update();
        expect(wrapper.state('selectedCategory')).toBe(2);
        wrapper.instance().previous();
        wrapper.update();
        expect(wrapper.state('page')).toBe(1);
        wrapper.instance().setLimit(8)
        wrapper.instance().next();
        wrapper.update();
        expect(wrapper.state('page')).toBe(2);
    });
});
