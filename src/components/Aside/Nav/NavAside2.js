import React from 'react';

import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

const navigationAside2 = (props) => {
    const navigationLinks = [
        {
            path: '/logout',
            value: 'Sign Out'
        },
        {
            path: '/load/class',
            value: 'Classes'
        },
        {
            path: '/load/user',
            value: 'Users'
        },
        {
            path: '/load/student',
            value: 'Students'
        }
    ];
    switch (props.page) {
        case 'deck':
            navigationLinks.unshift({
                path: '/load/card',
                value: 'Cards'
            });
            break;
        case 'card':
            navigationLinks.unshift({
                path: '/load/deck',
                value: 'Decks'
            });
            break;
        default:
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
            </div>
        </nav>
    );
}

export default navigationAside2;