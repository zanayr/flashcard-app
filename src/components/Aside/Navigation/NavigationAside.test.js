import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import {NavigationAside} from './NavigationAside';
import BarButton from '../../ui/button/Bar/BarButton';

configure({adapter: new Adapter()});

describe ('<NavigationAside/>', () => {
    it('should render the users <BarButton/> if the user has the privilage', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 1}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(5);
    });
});