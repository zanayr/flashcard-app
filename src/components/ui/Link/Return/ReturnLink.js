import React from 'react';
import {Link} from 'react-router-dom';

import style from '../Link.module.css';
import logo from '../../../../images/egghead-logo.png';

const returnLink = (props) => {
    return (
        <div className={style.Return}>
            <Link to='/'>
                <span><img alt={''} src={logo}/></span>
            </Link>         
        </div>
    );
}

export default returnLink;