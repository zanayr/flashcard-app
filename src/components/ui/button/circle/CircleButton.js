import React from "react";

import CircleButtonCSS from "./CircleButton.module.css";

const circleButton = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    return (
        <button
            className={CircleButtonCSS.Circle_Button}
            onClick={handle_onClicked}>
            {props.children}
        </button>
    );
}

export default circleButton;