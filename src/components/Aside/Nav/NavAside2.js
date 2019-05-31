import React from 'react';

import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

const navigationAside2 = (props) => {
    const navigationLinks = [
        {
            path: '/report',
            value: 'Reports'
        }
    ];
    if (props.select_user.privilage) {
        navigationLinks.push({
            path: '/2/user',
            value: 'Users'
        });
    }
    switch (props.page) {
        case 'deck':
            navigationLinks.unshift({
                path: '/1/card',
                value: 'Cards'
            });
            break;
        case 'card':
            navigationLinks.unshift({
                path: '/0/deck',
                value: 'Decks'
            });
            break;
        default:
            navigationLinks.unshift({
                path: '/1/card',
                value: 'Cards'
            },
            {
                path: '/0/deck',
                value: 'Decks'
            });
            break;
    }
    const navigationButtons = navigationLinks.map((link, i) => {
        return (
            <BarButton
                key={i}
                onClick={() => {
                    props.history.replace(navigationLinks[i].path);
                }}>
                {navigationLinks[i].value}
            </BarButton>
        );
    });
    
    return (
        <nav className={[styles.Aside, styles.Navigation].join(' ')}>
            <div>
                {navigationButtons}
                <div className={styles.Break}></div>
                <BarButton
                    key={'out'}
                    onClick={() => {
                        props.history.replace('/out');
                    }}>
                    Sign Out
                </BarButton>
            </div>
        </nav>
    );
}


const mapStateToProps = (state) => {
    return {
        select_user: select.user(state)
    }
}
export default connect(mapStateToProps, null)(navigationAside2);