import React from 'react';

import AppCSS from '../../../App.module.css';
import overlayCSS from '../Overlay.module.css';

const overlay = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.action();
    }
    
    if (!props.active) {
        return null;
    }
    return (
        <div
            className={overlayCSS.Overlay}
            onClick={(e) => handle_onClick(e)}>
            <div>
            </div>
        </div>
    );
}

export default overlay;