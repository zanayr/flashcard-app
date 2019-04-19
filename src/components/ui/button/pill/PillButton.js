import React from 'react';

import buttonCSS from '../Button.module.css';
import pillButtonCSS from './PillButton.module.css';

const pillButton = (props) => {
    return (
        <button
            className={[buttonCSS.Button, pillButtonCSS.Pill_Button, props.className].join(' ')}
            onClick={(e) => {props.onClick(e)}}>
            {props.children}
        </button>
    );
}

export default pillButton;