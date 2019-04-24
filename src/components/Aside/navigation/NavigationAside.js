import React from 'react';
import {createHashId} from '../../../utility';

import Aux from '../../../hoc/aux/Aux';
import Row from '../../structure/row/Row';
import IconButton from '../../ui/button/icon/IconButton';
import NavigationButton from '../../ui/button/navigation/NavigationButton';

import AppCSS from '../../../App.module.css';
import navigationAsideCSS from './NavigationAside.module.css';

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
            <nav className={navigationAsideCSS.Navigation}>
                <div className={AppCSS.Inner}>
                    {navigationButtons}
                </div>
            </nav>
        </Aux>
    );
}

export default navigationAside;