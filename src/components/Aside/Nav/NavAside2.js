import React from 'react';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

const navigationAside2 = (props) => {
    const navigationLinks = [
        {
            path: '/report',
            value: 'reports'
        }
    ];
    switch (props.page) {
        case 'deck':
            navigationLinks.unshift({
                path: '/1/card',
                value: 'cards'
            });
            break;
        case 'card':
            navigationLinks.unshift({
                path: '/0/deck',
                value: 'decks'
            });
            break;
        default:
            navigationLinks.unshift({
                path: '/1/card',
                value: 'cards'
            },
            {
                path: '/0/deck',
                value: 'decks'
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
                <BarButton
                    key={'user'}
                    onClick={() => {
                        props.init('user');
                        props.history.replace('/load', {store: 'user'});
                    }}>
                    users
                </BarButton>
                <div className={styles.Break}></div>
                <BarButton
                    key={'out'}
                    onClick={() => {
                        props.history.replace('/out');
                    }}>
                    sign out
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
const mapDispatchToProps = (dispatch) => {
    return {
        init: (store) => dispatch(actions.init(store))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navigationAside2);