import React from 'react';

import GlobalCSS from '../../../Global.module.css';
import ColumnCSS from './Column.module.css';

const column = (props) => {
    let justification = props.just ? ColumnCSS[props.just] : ColumnCSS.Start;
    return (
        <div className={ColumnCSS.Column + " " + justification}>
            <div className={GlobalCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default column;