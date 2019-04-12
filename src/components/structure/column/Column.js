import React from 'react';

import CSS from './Column.module.css';

const column = (props) => {
    let justification = props.just ? props.just : CSS.start;
    return (
        <div className={CSS.column + " " + justification}>
            <div className={CSS.column_inner}>
                {props.children}
            </div>
        </div>
    );
}

export default column;