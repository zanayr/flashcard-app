import React from "react";

import buttonCSS from "../Button.module.css";
import quickButtonCSS from "./QuickButton.module.css";

const quickButton = (props) => {
    let cssClasses = [buttonCSS.Button, quickButtonCSS.Quick_Button];
    if (props.active) {
        cssClasses = [...cssClasses, quickButtonCSS.Active];
    }
    if (props.delete) {
        cssClasses = [...cssClasses, quickButtonCSS.Delete];
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

export default quickButton;