import React from 'react';

import buttonCSS from '../Button.module.css';
import barButtonCSS from './BarButton.module.css';

const barButton = (props) => {
    return (
        <button
            className={[buttonCSS.Button, barButtonCSS.Bar_Button, barButtonCSS[props.just]].join(" ")}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default barButton;