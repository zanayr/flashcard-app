import React from 'react';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

const navigationAside = (props) => {
    const links = [
        {
            path: '/report',
            value: 'reports'
        }
    ];
    switch (props.page) {
        case 'deck':
            links.unshift({
                path: '/1/card',
                value: 'cards'
            });
            break;
        case 'card':
            links.unshift({
                path: '/0/deck',
                value: 'decks'
            });
            break;
        default:
            links.unshift({
                path: '/1/card',
                value: 'cards'
            },
            {
                path: '/0/deck',
                value: 'decks'
            });
            break;
    }
    const navigation = links.map((link, i) => {
        return (
            <BarButton
                key={i}
                className={styles.Link}
                onClick={() => {
                    props.history.replace(links[i].path);
                }}>
                {links[i].value}
            </BarButton>
        );
    });
    let aux = null;
    if (props.select_user.privilage) {
        aux = (
            <BarButton
                key={'user'}
                className={styles.Link}
                onClick={() => {
                    props.init('user');
                    props.history.replace('/load', {store: 'user'});
                }}>
                users
            </BarButton>
        );
    }
    
    return (
        <nav className={styles.Navigation}>
            <div>
                {navigation}
                {aux}
                <div className={styles.Break}></div>
                <BarButton
                    key={'out'}
                    className={styles.Link}
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

export default connect(mapStateToProps, mapDispatchToProps)(navigationAside);