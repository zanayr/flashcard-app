import React from 'react';

import buttonCSS from '../Button.module.css';
import iconButtonCSS from './IconButton.module.css';

const iconButton = (props) => {
    return (
        <button
            className={[buttonCSS.Button, iconButtonCSS.Icon_Button].join(" ")}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default iconButton;