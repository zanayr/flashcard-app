import React from "react";

import _hashIDCreate from "../../../helper/id";

import Aux from "../../../hoc/aux/Aux";
import Overlay from "../overlay/Overlay";
import Row from "../../structure/row/Row";
import Button from "../button/Button";

import globalCSS from "../../../Global.module.css";
import modalCSS from "./Modal.module.css";

const modal = (props) => {
    let details = [];
    if (!props.active) {
        return null;
    }
    if (props.data.details) {
        details = props.data.details.map(detail => {
            return (<li key={_hashIDCreate()}>{detail}</li>);
        });
    }

    return (
        <Aux>
            <Overlay active={props.active}/>
            <div className={modalCSS.Modal}
                key={_hashIDCreate()}>
                <div className={globalCSS.Inner}>
                    <Row just="Start" align="Center">
                        <span></span>
                        <h3>{props.data.title ? props.data.title : "Alert!"}</h3>
                    </Row>
                    <p>{props.data.message}</p>
                    {details.length ? (<ul>{details}</ul>) : null}
                    <Row just={props.data.cancel ? "Between" : "End"}>
                        {props.data.cancel ? (<Button onClick={props.onCancel}>{props.data.cancel}</Button>) : null}
                        <Button onClick={props.onConfirm ? props.onConfirm : () => {}}>{props.data.confirm ? props.data.confirm : "OK"}</Button>
                    </Row>
                </div>
            </div>
        </Aux>
    );
}

export default modal;