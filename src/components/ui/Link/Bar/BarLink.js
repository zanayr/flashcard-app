import React from 'react';
import {Link} from 'react-router-dom';

import style from '../Link.module.css';

const barLink = (props) => {
    return (
        <div className={[style.Bar, props.className].join(' ')}>
            <Link to={{
                pathname: props.path,
                state: props.state
            }}><span>{props.children}</span>
            </Link>
        </div>
    );
}

export default barLink;