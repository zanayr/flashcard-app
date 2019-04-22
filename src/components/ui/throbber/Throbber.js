import React from "react";

import throbberCSS from "./Throbber.module.css";

const throbber = (props) => {
    return (
        <div className={throbberCSS.Throbber}>Loading...</div>
    );
}

export default throbber;