import React from 'react';
import { shallow } from 'enzyme'
import DeleteAccount from './DeleteAccount.jsx';


test("Header component", () => {
    const wrapper = shallow(<DeleteAccount/>);
    expect(wrapper).toMatchSnapshot();
});
