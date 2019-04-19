import React from 'react';

import globalCSS from '../../../../Global.module.css';
import listItemCSS from './ListItem.module.css';

const listItem = (props) => {
    return (
        <div className={listItemCSS.List_Item}>
            <div className={globalCSS.Inner}>
                <h3>{props.title}</h3>
                <p>{props.detail}</p>
            </div>
        </div>
    );
}

export default listItem;