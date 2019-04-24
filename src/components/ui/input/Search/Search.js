import React from 'react';

import searchCSS from './Search.module.css';
import AppCSS from '../../../../App.module.css';

const searchBar = (props) => {
    return (
        <div className={searchCSS.Search}>
            <div className={AppCSS.Inner}>
                <input className={searchCSS.Search_Bar} type="text" placeholder="Search"/>
            </div>
        </div>
    );
}

export default searchBar;