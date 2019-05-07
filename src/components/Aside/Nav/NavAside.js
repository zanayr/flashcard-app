import React from 'react';

import BarLink from '../../ui/link/Bar/BarLink';

import styles from '../Aside.module.css';

const navigationAside = (props) => {
    const navigationLinks = [
        {
            path: '/logout',
            value: 'Sign Out'
        }
    ];
    switch (props.page) {
        case 'deck':
            navigationLinks.unshift({
                path: '/u/card',
                value: 'Cards'
            });
            break;
        case 'card':
            navigationLinks.unshift({
                path: '/u/deck',
                value: 'Decks'
            });
            break;
        default:
            break;
    }
    const navigationButtons = navigationLinks.map((link, i) => {
        return (
            <BarLink
                key={i}
                path={link.path}>{link.value}
            </BarLink>
        );
    });
    
    return (
        <nav className={styles.Aside}>
            <div>
                {navigationButtons}
            </div>
        </nav>
    );
}

export default navigationAside;