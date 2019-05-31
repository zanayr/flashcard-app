import React from 'react';

import CircleButton from '../button/Circle/CircleButton';
import IconButton from '../button/Icon/IconButton';

import styles from './Dashboard.module.css';

const dashboard = (props) => {
    const handle_onAccountClicked = () => {
        //  Go to Account Page
        console.log("Routing to account page...");
    }
    const handle_onNavigationClicked = () => {

        props.onNavigation(1);
    }
    console.log(props.data);
    return (
        <div className={styles.Dashboard}>
            <div className={styles.Inner}>
                <div className={styles.Account}>
                    <h6 className={styles.Account_Name}>{props.data.primary} {props.data.secondary}</h6>
                </div>
                <IconButton onClick={handle_onNavigationClicked}>N</IconButton>
            </div>
        </div>
    );
};

export default dashboard;