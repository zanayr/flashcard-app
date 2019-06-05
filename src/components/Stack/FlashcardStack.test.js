import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import {FlashcardStack} from './FlashcardStack';
import Flashcard from '../ui/Card/Flashcard';

configure({adapter: new Adapter()});

describe ('<FlashcardStack/>', () => {
    it('should render the first <Flashcard/>', () => {
        const card = [{
            date: Date.now(),
            flag: false,
            group: [],
            id: 'osdf87s6df5sdg65',
            member: [],
            meta: {},
            note: '',
            owner: '0sds09d8g7fsa6d8sdf56sg',
            primary: '',
            secondary: '',
            tag: [],
        }];
        const wrapper = shallow(<FlashcardStack collection={card}/>);
        expect(wrapper.find(Flashcard)).toHaveLength(1);
    });
});