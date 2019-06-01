import React from 'react';

import CircleButton from '../button/Circle/CircleButton';
import IconButton from '../button/Icon/IconButton';

import styles from './Dashboard.module.css';

const dashboard = (props) => {
    const handle_onNavigationClicked = () => {

        props.onNavigation(1);
    }
    return (
        <div className={styles.Dashboard}>
            <div>
                <div className={styles.Account}>
                    <h6 className={styles.Name}>{props.data.primary} {props.data.secondary}</h6>
                </div>
                <IconButton onClick={handle_onNavigationClicked}>☰</IconButton>
            </div>
        </div>
    );
};

export default dashboard;