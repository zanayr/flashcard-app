import React from 'react';

import IconButton from '../button/icon/IconButton';

import globalCSS from '../../../Global.module.css';
import toolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    function onX(e) {
        e.stopPropagation();
        props.toggleAside(0);
    }
    function onY(e) {
        e.stopPropagation();
        props.toggleAside(1);
    }
    return (
        <div className={toolbarCSS.Toolbar}>
            <div className={globalCSS.Inner}>
                <IconButton onClick={onX}>X</IconButton>
                <IconButton onClick={onY}>Y</IconButton>
            </div>
        </div>
    );
}

export default toolbar;