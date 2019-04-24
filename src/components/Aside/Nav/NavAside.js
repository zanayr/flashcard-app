import React from 'react';
import {createHashId} from '../../../utility';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import IconButton from '../../ui/button/Icon/IconButton';
import NavigationButton from '../../ui/button/Nav/NavButton';

import AppCSS from '../../../App.module.css';
import NavAsideCSS from './NavAside.module.css';

const navigationAside = (props) => {
    const navigationLinks = [
        {
            path: '/logout',
            value: 'Sign Out'
        }
    ];
    const navigationButtons = navigationLinks.map(link => {
        return (
            <NavigationButton
                key={createHashId()}
                path={link.path}>
                {link.value}
            </NavigationButton>
        );
    });

    const handle_onClick = () => {
        props.onClose();
    }
    
    return (
        <Aux>
            <Row just='Between'>
                <h3>Navigation</h3>
                <IconButton onClick={handle_onClick}>X</IconButton>
            </Row>
            <nav className={NavAsideCSS.Navigation}>
                <div className={AppCSS.Inner}>
                    {navigationButtons}
                </div>
            </nav>
        </Aux>
    );
}

export default navigationAside;