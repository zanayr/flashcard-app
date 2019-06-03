import React from 'react';
import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

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
                    <h6 className={styles.Name}>{props.select_user.primary} {props.select_user.secondary}</h6>
                </div>
                <IconButton onClick={handle_onNavigationClicked}>☰</IconButton>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        select_user: select.user(state)
    }
}

export default connect(mapStateToProps, null)(dashboard);