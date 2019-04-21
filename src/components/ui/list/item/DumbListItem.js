import React from "react";

import Column from "../../../structure/column/Column";
import QuickButton from "../../button/quick/QuickButton";

import globalCSS from "../../../../Global.module.css";
import listItemCSS from "./ListItem.module.css";

const listItem = (props) => {
    const values = {
        details: props.details,
        id: props.id,
        isSelected: false,
        title: props.title
    }
    
    let cssClasses = [listItemCSS.List_Item];
    if (values.isSelected) {
        cssClasses = [listItemCSS.List_Item, listItemCSS.Selected];
    }

    const handle_editClicked = () => {
        props.onEdit({...values});
    }
    const handle_deleteClicked = () => {
        props.onDelete({...values});
    }
    const handle_itemSelected = (e) => {
        e.stopPropagation();
        values.isSelected = !values.isSelected;
        props.onSelect({...values});
    }

    return (
        <div
            className={cssClasses.join(' ')}
            onClick={(e) => handle_itemSelected(e)}>
            <div className={globalCSS.Inner}>
                <Column just="Center" align="Start">
                    <h3>{values.id + " " + values.title}</h3>
                    <p>{values.details}</p>
                </Column>
                <QuickButton
                    active={values.isSelected && props.single}
                    onClick={handle_editClicked}>
                    Edit
                </QuickButton>
                <QuickButton
                    active={values.isSelected && props.single}
                    delete
                    onClick={handle_deleteClicked}>
                    Delete
                </QuickButton>
            </div>
        </div>
    );
}

export default listItem;