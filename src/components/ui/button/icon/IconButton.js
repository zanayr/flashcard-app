import React from "react";

import buttonCSS from "../Button.module.css";
import iconButtonCSS from "./IconButton.module.css";

const iconButton = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();
        props.onClick();
    } 
    return (
        <button
            className={[buttonCSS.Button, iconButtonCSS.Icon_Button].join(' ')}
            onClick={(e) => handle_onClicked(e)}>
            {props.children}
        </button>
    );
}

export default iconButton;