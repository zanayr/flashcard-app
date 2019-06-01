import React from 'react';

import styles from './Throbber.module.css';

const throbber = (props) => {
    return (
        <div className={styles.Throbber}>
            <div>
                <p className={props.className}>Loading...</p>
            </div>
        </div>
    );
}

export default throbber;