import React from "react"

import Aux from "../../../../hoc/aux/Aux";
import Row from "../../../structure/row/Row";
import IconButton from "../../button/icon/IconButton";
import NavigationButton from "../../button/navigation/NavigationButton";

import globalCSS from "../../../../Global.module.css";
import navigationAsideCSS from "./NavigationAside.module.css";

const navigationAside = (props) => {
    const navigationLinks = [
        {
            path: "/logout",
            value: "Sign Out"
        }
    ];
    const navigationButtons = navigationLinks.map(link => {
        return (
            <NavigationButton
                key={navigationLinks.indexOf(link)}
                path={link.path}>
                {link.value}
            </NavigationButton>
        );
    });

    const handle_onCloseClicked = () => {
        //  Save data to server
        props.onX();
    }
    
    return (
        <Aux>
            <Row just="Between">
                <h3>Navigation</h3>
                <IconButton onClick={handle_onCloseClicked}>X</IconButton>
            </Row>
            <nav className={navigationAsideCSS.Navigation}>
                <div className={globalCSS.Inner}>
                    {navigationButtons}
                </div>
            </nav>
        </Aux>
    );
}

export default navigationAside;