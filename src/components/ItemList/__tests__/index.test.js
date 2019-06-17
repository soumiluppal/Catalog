import React from 'react';
import ReactDOM from 'react-dom';
import { ItemList } from '..';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Item List tests", () => {
    it('Item List component renders without crashing', async () => {
        const props = {
            user_id: 1
        }
        const wrapper = shallow(
            <ItemList {...props} />
        );
        expect(wrapper.find('.item-list-group').exists()).toBe(true);
    });

    it('Functions setting state properly', async () => {
        const props = {
            categoryId: 2,
            page: 1
        }
        const wrapper = shallow(
            <ItemList {...props} />
        );
        await wrapper.instance().updateItems();
        await wrapper.update();
        expect(wrapper.find('.list-item').exists()).toBe(true);
        //wrapper.setState({allItems: items});
    });
});