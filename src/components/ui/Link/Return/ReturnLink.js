import React from 'react';
import {Link} from 'react-router-dom';

import style from '../Link.module.css';

const returnLink = (props) => {
    return (
        <div className={style.Return}>
            <Link to='/'>
                <span>{props.children}</span>
            </Link>         
        </div>
    );
}

export default returnLink;