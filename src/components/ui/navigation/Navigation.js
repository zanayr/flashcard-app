import React from 'react';

import CircleButton from '../button/circle/CircleButton';
import IconButton from '../button/icon/IconButton';

import globalCSS from '../../../Global.module.css';
import navCSS from './Navigation.module.css';

const navigation = (props) => {
    function onX(e) {
        e.stopPropagation();
        //  Go to Account Page
    }
    function onY(e) {
        e.stopPropagation();
        props.toggleAside(2);
    }
    return (
        <div className={navCSS.Navigation}>
            <div className={globalCSS.Inner}>
                <div className={navCSS.Account}>
                    <h6 className={navCSS.Account_Name}>Ryan Fickencher</h6>
                </div>
                <CircleButton onClick={onX}>RF</CircleButton>
                <IconButton onClick={onY}>Nav</IconButton>
            </div>
        </div>
    );
};

export default navigation;