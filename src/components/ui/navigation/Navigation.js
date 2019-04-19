import React from 'react';

import Row from '../../structure/row/Row';
import BarButton from '../button/bar/BarButton';
import CircleButton from '../button/circle/CircleButton';

import navCSS from './Navigation.module.css';

const navigation = (props) => {
    return (
        <div className={navCSS.Navigation}>
            <div>
                <BarButton onClick={props.onAccountClicked} just="Right">Ryan Fickencher</BarButton>
                <CircleButton onClick={props.onNavClicked}>RF</CircleButton>
            </div>
        </div>
    );
};

export default navigation;