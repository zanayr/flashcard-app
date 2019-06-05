import React from 'react';

import styles from './Overlay.module.css';

const overlay = (props) => {
    if (!props.active) {
        return null;
    }
    return (
        <div className={styles.Modal}></div>
    );
}

export default overlay;