import React from 'react';

import GlobalCSS from '../../../Global.module.css';
import RowCSS from './Row.module.css';

const row = (props) => {
    let justification = props.just ? RowCSS[props.just] : RowCSS.Between; 
    return (
        <div className={RowCSS.Row + " " + justification}>
            <div className={GlobalCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default row;