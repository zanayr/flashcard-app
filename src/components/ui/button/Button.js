import React from 'react';

import ButtonCSS from './Button.module.css';

const button = (props) => {
    let buttonClass;

    switch (props.type) {
        case ('submit'):
            buttonClass = "Submit";
            break;
        case ("round-icon"):
            buttonClass = "Round_Icon";
            break;
        case ("bar"):
            buttonClass = "Bar";
            break;
        default:
            buttonClass = "Button";
            break;
    }
    return (
        <button
            {...props}
            className={ButtonCSS[buttonClass]}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default button;