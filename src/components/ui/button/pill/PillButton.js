import React from 'react';

import PillButtonCSS from './PillButton.module.css';

const pillButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    
    return (
        <button
            className={[PillButtonCSS.Pill_Button, props.className].join(' ')}
            onClick={handle_onClick}>
            {props.children}
        </button>
    );
}

export default pillButton;