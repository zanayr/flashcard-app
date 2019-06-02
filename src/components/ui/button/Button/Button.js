import React from 'react';

import styles from '../Button.module.css';

const button = (props) => {
    const handle_onClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();

        props.onClick();
    }
    return (
        <button
            {...props}
            className={[styles.Button, props.className].join(' ')}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default button;