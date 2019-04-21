import React from "react";

import Column from "../../../structure/column/Column";
import QuickButton from "../../button/quick/QuickButton";

import globalCSS from "../../../../Global.module.css";
import listItemCSS from "./ListItem.module.css";

const listItem = (props) => {
    const _id = props.content.id;
    
    let cssClasses = [listItemCSS.List_Item];
    if (props.content.isSelected) {
        cssClasses = [listItemCSS.List_Item, listItemCSS.Selected];
    }

    const handle_editClicked = () => {
        props.onEdit(_id);
    }
    const handle_deleteClicked = () => {
        props.onDelete(_id);
    }
    const handle_itemSelected = (e) => {
        e.stopPropagation();
        props.onSelect(_id);
    }

    return (
        <div
            className={cssClasses.join(' ')}
            onClick={(e) => handle_itemSelected(e)}>
            <div className={globalCSS.Inner}>
                <Column just="Center" align="Start">
                    <h3>{_id + " " + props.content.title}</h3>
                    <p>{props.content.details}</p>
                </Column>
                <QuickButton
                    active={props.content.isSelected && props.single}
                    onClick={handle_editClicked}>
                    Edit
                </QuickButton>
                <QuickButton
                    active={props.content.isSelected && props.single}
                    delete
                    onClick={handle_deleteClicked}>
                    Delete
                </QuickButton>
            </div>
        </div>
    );
}

export default listItem;