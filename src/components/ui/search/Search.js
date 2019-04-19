import React from 'react';

import Input from "../input/Input";

import searchCSS from './Search.module.css';
import globalCSS from '../../../Global.module.css';

const searchBar = (props) => {
    return (
        <div className={searchCSS.Search}>
            <div className={globalCSS.Inner}>
                <input className={[searchCSS.Search_Bar, searchCSS[props.className]].join(' ')} type="text" placeholder="Search"/>
            </div>
        </div>
    );
}

export default searchBar;