import React from 'react';

import ButtonCSS from './Button.module.css';

const button = (props) => {
    let buttonClass;

    switch (props.type) {
        case ('submit'):
            buttonClass = "Submit";
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