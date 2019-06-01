import React from 'react';

import style from '../Button.module.css';

const barButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    return (
        <button
            className={[style.Bar, props.className].join(' ')}
            onClick={(e) => {handle_onClick(e)}}>
            {props.children}
        </button>
    );
}

export default barButton;