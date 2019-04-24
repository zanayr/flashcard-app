import React from 'react';

import ContextButtonCSS from './ContextButton.module.css';

const contextButton = (props) => {
    let cssClasses = [ContextButtonCSS.Quick_Button];
    if (props.active) {
        cssClasses = [...cssClasses, ContextButtonCSS.Active];
    }
    if (props.delete) {
        cssClasses = [...cssClasses, ContextButtonCSS.Delete];
    }

    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button
            className={cssClasses.join(' ')}
            onClick={(e) => handle_onClick(e)}>
            {props.children}
        </button>
    );
}

export default contextButton;