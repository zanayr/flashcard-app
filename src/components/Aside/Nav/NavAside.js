import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import IconButton from '../../ui/button/Icon/IconButton';
import BarLink from '../../ui/link/Bar/BarLink';

import styles from '../Aside.module.css';

const navigationAside = (props) => {
    const navigationLinks = [
        {
            path: '/logout',
            value: 'Sign Out'
        }
    ];
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
                <Row just='Between'>
                    <h3>Navigation</h3>
                    <IconButton onClick={() => props.onClose()}>X</IconButton>
                </Row>
                <div className={styles.Navigation}>
                    <div>
                    {navigationButtons}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default navigationAside;