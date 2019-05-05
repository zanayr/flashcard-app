import React from 'react';

import IconButton from '../button/Icon/IconButton';

import AppCSS from '../../../App.module.css';
import ToolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <div className={ToolbarCSS.Toolbar}>
            <div className={AppCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default toolbar;