import React from "react"

import Aux from "../../../../hoc/aux/Aux";
import Row from "../../../structure/row/Row";
import Column from "../../../structure/column/Column";
import IconButton from "../../button/icon/IconButton";
import Input from "../../input/Input";

import globalCSS from "../../../../Global.module.css";
import asideCSS from "../Aside.module.css";
import quickEditAsideCSS from "./QuickEditAside.module.css";

const quickEditAside = (props) => {
    const handle_onCloseClicked = () => {
        //  Save data to server
        props.onX();
    }
    return (
        <Aux>
            <Row just="Between">
                <h3>Quick Edit</h3>
                <IconButton onClick={handle_onCloseClicked}>X</IconButton>
            </Row>
            <Column>
                <Input
                    config={{
                        placeholder: "Title",
                        type: "text"
                    }}
                    label="Collection Title"
                    key="0"
                    onChange={() => {}}
                    value={props.title}/>
                <Input
                    config={{
                        placeholder: "Details",
                        type: "text"
                    }}
                    label="Collection Details"
                    key="1"
                    onChange={() => {}}
                    value={props.detail}/>
            </Column>
        </Aux>
    );
}

export default quickEditAside;