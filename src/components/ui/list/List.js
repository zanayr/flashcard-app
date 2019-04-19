import React from 'react';

import globalCSS from '../../../Global.module.css';
import listCSS from './List.module.css';

const list = (props) => {
    return (
        <div className={listCSS.List}>
            <div className={globalCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default list;