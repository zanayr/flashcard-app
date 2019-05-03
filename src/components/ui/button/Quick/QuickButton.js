import React from 'react';

import styles from '../Button.module.css';


const quickButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button
            className={styles.QuickButton}
            onClick={(e) => handle_onClick(e)}>
            <span>{props.children}</span>
        </button>
        
    );
}


export default quickButton;