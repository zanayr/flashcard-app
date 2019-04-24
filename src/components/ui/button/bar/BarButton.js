import React from 'react';

import BarButtonCSS from './BarButton.module.css';

const barButton = (props) => {
    return (
        <button
            className={[BarButtonCSS.Bar_Button, BarButtonCSS[props.just]].join(' ')}
            onClick={(e) => {props.onClick(e)}}>
            {props.children}
        </button>
    );
}

export default barButton;