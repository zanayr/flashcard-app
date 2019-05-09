import React from 'react';

import styles from './Button.module.css';

const button = (props) => {
    const handle_onClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();

        props.onClick();
    }
    let css = [];

    switch (props.type) {
        case ('submit'):
            css.push(styles.Submit);
            break;
        case ('round-icon'):
            css.push(styles.Round);
            break;
        case ('bar'):
            css.push(styles.Bar);
            break;
        default:
            css.push(styles.Button);
            break;
    }
    css.push(props.className);
    return (
        <button
            {...props}
            className={css.join(' ')}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default button;