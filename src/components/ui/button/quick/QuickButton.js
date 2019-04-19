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
    return (
        <button
            className={cssClasses.join(' ')}
            onClick={(e) => {props.onClick(e)}}>
            {props.children}
        </button>
    );
}

export default quickButton;