import React from 'react';
import { shallow } from 'enzyme'
import Header from './Pages/Contact/Header.jsx';


test("Header component", () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
});
