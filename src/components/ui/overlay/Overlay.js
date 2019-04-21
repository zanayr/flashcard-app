import React from "react";

import globalCSS from "../../../Global.module.css";
import overlayCSS from "./Overlay.module.css";

const overlay = (props) => {
    if (!props.active) {
        return null;
    }
    return (
        <div className={overlayCSS.Overlay}>
            <div className={globalCSS.Inner}>
            </div>
        </div>
    )
}

export default overlay;