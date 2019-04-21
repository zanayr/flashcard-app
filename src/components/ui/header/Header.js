import React from "react";

import Logo from "../../ui/button/logo/Logo";
import Search from "../../ui/search/Search";
import Toolbar from "../../ui/toolbar/Toolbar";
import Navigation from "../../ui/navigation/Navigation";

import globalCSS from "../../../Global.module.css";
import headerCSS from "./Header.module.css";

const header = (props) => {
    const handle_onClicked = (e) => {
        e.stopPropagation();
    }

    return (
        <header
            className={headerCSS.Header}
            onClick={(e) => handle_onClicked(e)}>
            <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
                <Logo/>
                <Search/>
                <Toolbar
                    onA={props.onA}
                    onB={props.onB}/>
                <Navigation
                    onNavigation={props.onNavigation}/>
            </div>
        </header>
    );
}

export default header;