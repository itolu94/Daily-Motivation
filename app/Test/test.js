import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme'
import Layout from '../Components/Layout.jsx';
import renderer from 'react-test-renderer';


test("Layout component", () => {
   const component = shallow(<Layout/>)
   expect(component).toMatchSnapshot();
});