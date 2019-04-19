import React, {Component} from 'react';

import IconButton from '../button/icon/IconButton';

import globalCSS from '../../../Global.module.css';
import toolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    function onX() {
        props.toggleAside();
        props.updateAside(0);
    }
    function onY() {
        props.toggleAside();
        props.updateAside(1);
    }
    return (
        <div className={toolbarCSS.Toolbar}>
            <div className={globalCSS.Inner}>
                <IconButton onClick={onX}>D</IconButton>
                <IconButton onClick={onY}>S</IconButton>
            </div>
        </div>
    );
}

export default toolbar;