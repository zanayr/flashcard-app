import React from "react";

import AppCSS from "../../App.module.css";
import columnCSS from "./Column.module.css";

const column = (props) => {
    let cssClasses = [columnCSS.Column];
    if (props.just) {
        cssClasses = [...cssClasses, columnCSS["Just_" + props.just]];
    }
    if (props.align) {
        cssClasses = [...cssClasses, columnCSS["Align_" + props.align]];
    }
    if (props.fill) {
        cssClasses = [...cssClasses, columnCSS.Fill];
    }
    
    return (
        <div className={cssClasses.join(' ')}>
            <div className={AppCSS.Inner}>
                {props.children}
            </div>
        </div>
    );
}

export default column;