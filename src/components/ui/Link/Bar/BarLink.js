import React from 'react';
import {Link} from 'react-router-dom';

import LinkCSS from '../Link.module.css';
import BarLinkCSS from './BarLink.module.css';

const barLink = (props) => {
    const cssClasses = [LinkCSS.Link, BarLinkCSS.Bar_Link];
    return (
        <div className={cssClasses.join(' ')}>
            <Link to={props.path}>
                <span>{props.children}</span>
            </Link>
        </div>
    );
}

export default barLink;