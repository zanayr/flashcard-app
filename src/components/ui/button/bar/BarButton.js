import React from 'react';

import BarButtonCSS from './BarButton.module.css';

const barButton = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    return (
        <button
            className={[BarButtonCSS.Bar_Button, BarButtonCSS[props.just]].join(' ')}
            onClick={(e) => {handle_onClick(e)}}>
            {props.children}
        </button>
    );
}

export default barButton;