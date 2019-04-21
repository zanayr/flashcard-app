import React from "react";

import buttonCSS from "../Button.module.css";
import circleButtonCSS from "./CircleButton.module.css";

const circleButton = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    return (
        <button
            className={[buttonCSS.Button, circleButtonCSS.Circle_Button].join(" ")}
            onClick={handle_onClicked}>
            {props.children}
        </button>
    );
}

export default circleButton;