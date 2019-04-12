import React from 'react';

import CSS from './Row.module.css';

const row = (props) => {
    let justification = props.just ? props.just : CSS.between; 
    return (
        <div className={CSS.row + " " + justification}>
            <div className={CSS.row_inner}>
                {props.children}
            </div>
        </div>
    );
}

export default row;