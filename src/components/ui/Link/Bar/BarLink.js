import React from 'react';
import {Link} from 'react-router-dom';

import BarLinkCSS from './BarLink.module.css';

const barLink = (props) => {
    return (
        <div className={BarLinkCSS.Bar_Link}>
            <Link to={props.path}>
                <span>{props.children}</span>
            </Link>
        </div>
    );
}

export default barLink;