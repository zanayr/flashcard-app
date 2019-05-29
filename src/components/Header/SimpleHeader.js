import React from 'react';

import ReturnLink from '../ui/link/Return/ReturnLink';
import BarLink from '../ui/link/Bar/BarLink';
import Dashboard from '../ui/Dashboard/Dashboard';

import styles from './Header.module.css';

const simpleHeader = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    let content = null;
    if (props.path) {
        content = (
            <BarLink
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
                <ReturnLink/>
                {content}
                <Dashboard onNavigation={this.props.actions.navigation}/>
            </div>
        </header>
    );
}


export default simpleHeader;