import React from 'react';
import {Link} from 'react-router-dom';

import buttonCSS from '../Button.module.css';
import navButtonCSS from './NavigationButton.module.css';

const barButton = (props) => {
    return (
        <div className={[navButtonCSS.Navigation_Button, buttonCSS.Aside_Button].join(' ')}>
            <Link to={props.path}>
                <span>{props.children}</span>
            </Link>
        </div>
    );
}

export default barButton;