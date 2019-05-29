import React from 'react';

import styles from './Tag.module.css';


const tag = (props) => {
    return (
        <div className={styles.Tag}>
            <span><p>{props.children.replace('_', ' ')}</p></span>
        </div>
    );
}


export default tag;