import React from 'react';

import buttonCSS from '../Button.module.css';
import pillButtonCSS from './PillButton.module.css';

const pillButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    
    return (
        <button
            className={[buttonCSS.Button, pillButtonCSS.Pill_Button, props.className].join(' ')}
            onClick={handle_onClick}>
            {props.children}
        </button>
    );
}

export default pillButton;