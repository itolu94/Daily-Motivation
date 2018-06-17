import React from 'react';
import { shallow } from 'enzyme'
import Registration from './Registration.jsx';


test("Registration component", () => {
    const wrapper = shallow(<Registration/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({
        userName: 'itoodud',
        email: 'djdsj@mail.com',
        phoneNumber: '9999999999',
    });
    expect(wrapper).toMatchSnapshot();
    // wrapper.find('.registration-submit').simulate('click');
    // expect(wrapper.state().response).toEqual("Account was created");
})