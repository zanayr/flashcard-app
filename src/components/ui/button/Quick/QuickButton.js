import React from 'react';

import styles from '../Button.module.css';


const quickButton = (props) => {
    let css = [styles.QuickButton];
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    if (props.undo) {
        css.push(styles.QuickUndo);
    }
    return (
        <button
            className={css.join(' ')}
            onClick={(e) => handle_onClick(e)}>
            <span>{props.children}</span>
        </button>
        
    );
}


export default quickButton;