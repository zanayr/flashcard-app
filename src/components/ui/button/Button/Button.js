import React from 'react';

import ButtonCSS from './Button.module.css';

const button = (props) => {
    const handle_onClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onClick();
    }
    let buttonClass;

    switch (props.type) {
        case ('submit'):
            buttonClass = 'Submit';
            break;
        case ('round-icon'):
            buttonClass = 'Round_Icon';
            break;
        case ('bar'):
            buttonClass = 'Bar';
            break;
        default:
            buttonClass = 'Button';
            break;
    }
    return (
        <button
            {...props}
            className={ButtonCSS[buttonClass]}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default button;