import React from 'react';

import BarButton from '../../ui/button/Bar/BarButton';

import styles from '../Aside.module.css';

const navigationAside2 = (props) => {
    const navigationLinks = [
        {
            path: '/2/user',
            value: 'Users'
        },
        {
            path: '/out',
            value: 'Sign Out'
        }
    ];
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
            </div>
        </nav>
    );
}

export default navigationAside2;