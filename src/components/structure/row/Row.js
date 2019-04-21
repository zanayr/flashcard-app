import React from "react";

import globalCSS from "../../../Global.module.css";
import rowCSS from "./Row.module.css";

const row = (props) => {
    let cssClasses = [rowCSS.Row];
    if (props.just) {
        cssClasses = [...cssClasses, rowCSS["Just_" + props.just]];
    }
    if (props.align) {
        cssClasses = [...cssClasses, rowCSS["Align_" + props.align]];
    }
    if (props.fill) {
        console.log("here");
        cssClasses = [...cssClasses, rowCSS.Fill];
    }
    return (
        <div className={cssClasses.join(' ')}>
            <div className={globalCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default row;