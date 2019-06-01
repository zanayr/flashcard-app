import React from 'react';

import styles from '../Button.module.css';

const iconButton = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();

        props.onClick();
    }
    return (
        <button
            disabled={props.disabled}
            className={styles.Icon}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default iconButton;