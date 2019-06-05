import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import {NavigationAside} from './NavigationAside';
import BarButton from '../../ui/button/Bar/BarButton';

configure({adapter: new Adapter()});

describe ('<NavigationAside/>', () => {
    it('should render five <BarButton/> components if the user is an admin.', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 1}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(5);
    });
    it('should render four <BarButton/> components if the user\'s prvileges is only 0', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 0}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
});