import React from "react";

import _hashIDCreate from "../../../helper/id";

import Row from "../../structure/row/Row";
import Button from "../button/Button";

import globalCSS from "../../../Global.module.css";
import modalCSS from "./Modal.module.css";

const modal = (props) => {
    const details = props.data.details.map(detail => {
        return (<li key={_hashIDCreate()}>{detail}</li>);
    });
    if (!props.active) {
        return null;
    }
    return (
        <div className={modalCSS.Modal}
            key={_hashIDCreate()}>
            <div className={globalCSS.Inner}>
                <h3>{props.data.title ? props.data.title : "Alert!"}</h3>
                <p>{props.data.message}</p>
                {props.data.details.length ? (<ul>{details}</ul>) : null}
                <Row just={props.data.cancel ? "Between" : "End"}>
                    {props.data.cancel ? (<Button onClick={props.onCancel}>{props.data.cancel}</Button>) : null}
                    <Button onClick={props.onConfirm}>{props.data.confirm ? props.data.confirm : "OK"}</Button>
                </Row>
            </div>
        </div>
    );
}

export default modal;