import React from 'react';

import AppCSS from '../../../App.module.css';
import overlayCSS from './Overlay.module.css';

const overlay = (props) => {
    if (!props.active) {
        return null;
    }
    return (
        <div className={overlayCSS.Overlay}>
            <div className={AppCSS.Inner}>
            </div>
        </div>
    );
}

export default overlay;

