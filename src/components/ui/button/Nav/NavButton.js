import React from 'react';
import {Link} from 'react-router-dom';

import NavButtonCSS from './NavButton.module.css';

const navButton = (props) => {
    return (
        <div className={NavButtonCSS.Navigation_Button}>
            <Link to={props.path}>
                <span>{props.children}</span>
            </Link>
        </div>
    );
}

export default navButton;