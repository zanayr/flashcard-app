import React from 'react';
import {Link} from 'react-router-dom';

import ReturnLinkCSS from './ReturnLink.module.css';

const returnLink = (props) => {
    return (
        <div className={ReturnLinkCSS.Return_Link}>
            <Link to='/'>
                <span>{props.children}</span>
            </Link>         
        </div>
    );
}

export default returnLink;