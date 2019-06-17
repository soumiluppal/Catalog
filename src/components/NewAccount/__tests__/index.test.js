import React from 'react';
import ReactDOM from 'react-dom';
import { NewAccount } from '..';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { history } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import user from "axios";

configure({ adapter: new Adapter() });

describe("Authorization Tests", () => {

    it('Modal opens without crashing', () => {
        const wrapper = shallow(
            <NewAccount />
        );
        expect(wrapper.find('.user-modal').exists()).toBe(true);
    });

    it('LogIn: User logged in correctly on submit button and redux state is set', async () => {
        const historyMock = { goBack: jest.fn() };
        const props = {
            getToken: jest.fn(),
            history: historyMock
        }
        const wrapper = shallow(
            <NewAccount {...props} />
        );
        wrapper.setState({
            formGroupUsername: "testuser",
            formGroupPassword: "testpassword"
        });
        await wrapper.instance().onLogin();
        expect(props.getToken).toBeCalled();
    });

    it('LogIn: User not logged in with wrong credentials on submit button and redux state is set', async () => {
        const historyMock = { goBack: jest.fn() };
        const props = {
            getToken: jest.fn(),
            history: historyMock
        }
        const wrapper = shallow(
            <NewAccount {...props} />
        );
        wrapper.setState({
            formGroupUsername: "testuser1",
            formGroupPassword: "testpassword"
        });
        await wrapper.instance().onLogin().catch(e => {
            expect(props.getToken).not.toBeCalled();
        });
    });

    it('Register: User registered correctly on submit button and redux state is set', async () => {
        const historyMock = { goBack: jest.fn() };
        const props = {
            getToken: jest.fn(),
            history: historyMock
        }
        const wrapper = shallow(
            <NewAccount {...props} />
        );
        wrapper.setState({
            formGroupUsername: "soumiltester",
            formGroupPassword: "soumiltester123",
            formGroupName: "Soumil Tester",
            formGroupEmail: "soumiltester@gmail.com"
        });
        await wrapper.instance().onRegister();
        expect(props.getToken).toBeCalled();
    });

    it('Register: User not registered with improper credentials on submit button and redux state is set', async () => {
        const historyMock = { goBack: jest.fn() };
        const props = {
            getToken: jest.fn(),
            history: historyMock
        }
        const wrapper = shallow(
            <NewAccount {...props} />
        );
        wrapper.setState({
            formGroupUsername: "testuser",
            formGroupPassword: "soumiltester123",
            formGroupName: "Soumil Tester",
            formGroupEmail: "soumiltester@gmail.com"
        });
        await wrapper.instance().onRegister()
        expect(props.getToken).not.toBeCalled();

    });
});
