import React from 'react';
import {Link} from 'react-router-dom';

import BarLinkCSS from './BarLink.module.css';

const barLink = (props) => {
    console.log(props);
    return (
        <div className={BarLinkCSS.Bar_Link}>
            <Link to={{
                pathname: props.path,
                state: props.state
            }}>
                <span>{props.children}</span>
            </Link>
        </div>
    );
}

export default barLink;