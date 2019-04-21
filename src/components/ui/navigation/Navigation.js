import React from "react";

import CircleButton from "../button/circle/CircleButton";
import IconButton from "../button/icon/IconButton";

import globalCSS from "../../../Global.module.css";
import navigationCSS from "./Navigation.module.css";

const navigation = (props) => {
    const handle_onAccountClicked = () => {
        //  Go to Account Page
        console.log("Routing to account page...");
    }
    return (
        <div className={navigationCSS.Navigation}>
            <div className={[globalCSS.Inner, navigationCSS.Inner].join(' ')}>
                <div className={navigationCSS.Account}>
                    <h6 className={navigationCSS.Account_Name}>Ryan Fickencher</h6>
                </div>
                <CircleButton onClick={handle_onAccountClicked}>RF</CircleButton>
                <IconButton onClick={props.onNavigation}>N</IconButton>
            </div>
        </div>
    );
};

export default navigation;