import React from 'react';

import styles from '../Overlay.module.css';

const asideOverlay = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.action();
    }
    
    if (!props.active) {
        return null;
    }
    return (
        <div
            className={styles.AsideOverlay}
            onClick={(e) => handle_onClick(e)}>
            <div>
            </div>
        </div>
    );
}

export default asideOverlay;