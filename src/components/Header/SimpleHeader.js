import React from 'react';

import ReturnLink from '../ui/link/Return/ReturnLink';
import BarLink from '../ui/link/Bar/BarLink';
import Dashboard from '../ui/Dashboard/Dashboard';

import styles from './Header.module.css';

const simpleHeader = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        if (props.onClick) {
            props.onClick();
        }
    }
    let content = null;
    if (props.navigation) {
        content = (
            <BarLink
                className={styles.Back}
                path={props.navigation.path}
                state={{}}>
                {props.navigation.label}
            </BarLink>
        );
    }
    return (
        <header
            className={styles.Header}
            onClick={(e) => handle_onClick(e)}>
            <div>
                <div className={styles.Left}>
                    <ReturnLink/>
                    {content}
                </div>
                <Dashboard onNavigation={props.actions.navigation}/>
            </div>
        </header>
    );
}


export default simpleHeader;