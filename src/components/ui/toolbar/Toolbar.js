import React from "react";

import IconButton from "../button/icon/IconButton";

import globalCSS from "../../../Global.module.css";
import toolbarCSS from "./Toolbar.module.css";

const toolbar = (props) => {
    const handle_onAClicked = () => {
        props.onA();
    }
    const handle_onBClicked = () => {
        props.onB();
    }
    const handle_onClicked = (e) => {
        e.stopPropagation();
    }

    return (
        <div
            className={toolbarCSS.Toolbar}
            onClick={(e) => handle_onClicked(e)}>
            <div className={globalCSS.Inner}>
                <IconButton onClick={handle_onAClicked}>A</IconButton>
                <IconButton onClick={handle_onBClicked}>B</IconButton>
            </div>
        </div>
    );
}

export default toolbar;