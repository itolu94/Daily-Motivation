import React from 'react';
import { shallow } from 'enzyme'
import Contact from './Contact.jsx';


test("Header component", () => {
    const wrapper = shallow(<Contact/>);
    expect(wrapper).toMatchSnapshot();
});
