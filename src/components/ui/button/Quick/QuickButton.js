import React from 'react';

import styles from '../Button.module.css';

const quickButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    if (props.state) {
        return (
            <div className={styles.QuickButton_Container}>
                <div>
                    <button
                        className={styles.QuickButton}
                        onClick={(e) => handle_onClick(e)}>
                        {props.children}
                    </button>
                </div>
            </div>
            
        );
    } else {
        return null;
    }
}

export default quickButton;