import React from 'react';

import CSS from './Button.module.css';

const button = (props) => {
    let cssClass;
    switch (props.type) {
        case ('submit'):
            cssClass = "submit_button";
            break;
        default:
            cssClass = "button";
            break;
    }
    console.log(props);
    return (
        <button
            {...props}
            className={CSS[cssClass]}
            onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default button;