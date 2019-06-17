import React from 'react';
import ReactDOM from 'react-dom';
import { ItemModal } from '../ItemModal';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const items = [
    {
        "id": 1,
        "name": "item name 1",
        "description": "item description 1",
        "price": 30.5,
        "user_id": 1,
        "category_id": 2,
        "created": "2015-08-05T08:40:51.620Z",
        "updated": "2018-04-03T08:40:51.620Z"
    },
    {
        "id": 2,
        "name": "item name 2",
        "description": "item description 2",
        "price": 32.7,
        "user_id": 18,
        "category_id": 2,
        "created": "2015-08-05T08:40:51.620Z",
        "updated": "2018-04-03T08:40:51.620Z"
    }
]

describe("Modal tests", () => {
    it('Modal component renders without crashing', async () => {
        const props = {
            item: items[0]
        }
        const wrapper = shallow(
            <ItemModal {...props} />
        );
        expect(wrapper.find('ModalHeader').exists()).toBe(true);
    });

    it('Modal opens with update and delete buttons visible when user id matches', async () => {
        const props = {
            item: items[0],
            user_id: 1,
            showModal: true
        }
        const wrapper = shallow(
            <ItemModal {...props} />
        );
        expect(wrapper.find('.edit-mode-btn').length).toBe(2);
    });

    it('Modal opens without update and delete buttons visible when user id does not match', async () => {
        const props = {
            item: items[0],
            user_id: 2,
            showModal: true
        }
        const wrapper = shallow(
            <ItemModal {...props} />
        );
        expect(wrapper.find('.edit-mode-btn').length).toBe(0);
    });
});