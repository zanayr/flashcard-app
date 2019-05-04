import React from 'react';

import iconButtonCSS from './IconButton.module.css';

const iconButton = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();

        props.onClick();
    }

    return (
        <button
            disabled={props.disabled}
            className={iconButtonCSS.Icon_Button}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default iconButton;