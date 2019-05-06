import React from 'react';

import styles from '../Bar.module.css';


const toolbar = (props) => {
    return (
        <div className={styles.Toolbar}>
            <div>
                {props.children}
            </div>
        </div>
    );
}


export default toolbar;