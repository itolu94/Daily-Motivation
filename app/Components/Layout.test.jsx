import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme'
import Layout from './Layout.jsx';
import renderer from 'react-test-renderer';


test("Layout component", () => {
    const wrapper = shallow(<Layout/>)
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({"page": "registration"});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().page).toEqual("registration");
    wrapper.setState({"page": "delete-account"});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().page).toEqual("delete-account");
    wrapper.setState({"page": "contact"});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().page).toEqual("contact");
});
