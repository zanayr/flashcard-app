import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import {NavigationAside} from './NavigationAside';
import BarButton from '../../ui/button/Bar/BarButton';

configure({adapter: new Adapter()});

describe ('<NavigationAside/>', () => {
    it('should render five <BarButton/> components if user privilege is 1.', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 1}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(5);
    });
    it('should render four <BarButton/> components if user prvileges is 0', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 0}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
    it('should render four <BarButton/> components if user prvileges is null', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: null}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
    it('should render four <BarButton/> components if user prvileges is undefined', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: undefined}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
    it('should render four <BarButton/> components if user prvileges is -1', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: -1}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
    it('should render four <BarButton/> components if user prvileges is 2', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 2}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
    it('should render four <BarButton/> components if user prvileges is "foo"', () => {
        const wrapper = shallow(<NavigationAside select_user={{privilage: 'foo'}}/>);
        expect(wrapper.find(BarButton)).toHaveLength(4);
    });
});