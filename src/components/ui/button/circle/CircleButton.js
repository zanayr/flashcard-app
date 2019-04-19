import React from 'react';

import buttonCSS from '../Button.module.css';
import circleButtonCSS from './CircleButton.module.css';

const circleButton = (props) => {
    return (
        <button
            className={[buttonCSS.Button, circleButtonCSS.Circle_Button].join(" ")}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default circleButton;