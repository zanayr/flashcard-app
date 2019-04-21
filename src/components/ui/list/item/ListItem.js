import React, {Component} from "react";

import Column from "../../../structure/column/Column";
import QuickButton from "../../button/quick/QuickButton";

import globalCSS from "../../../../Global.module.css";
import listItemCSS from "./ListItem.module.css";

class ListItem extends Component {
    state = {
        id: this.props.content.id,
        isSelected: false
    }

    _itemSelect = () => {
        this.setState(prev => ({
            ...prev,
            isSelected: !prev.isSelected
        }), () => {
            this.props.onSelect(this.state.id);
        });
    }

    handle_onClicked = (e) => {
        e.stopPropagation();

        this._itemSelect();
    }
    handle_onEditClicked = () => {
        this.props.onEdit(this.state.id);
    }
    handle_onDeleteClicked = () => {
        this.props.onDelete(this.state.id);
    }

    render() {
        let cssClasses = [listItemCSS.List_Item];
        if (this.state.isSelected) {
            cssClasses = [listItemCSS.List_Item, listItemCSS.Selected];
        }
        return (
            <div
                className={cssClasses.join(' ')}
                onClick={(e) => this.handle_onClicked(e)}>
                <div className={globalCSS.Inner}>
                    <Column just="Center" align="Start">
                        <h3>{this.props.content.id + " " + this.props.content.title}</h3>
                        <p>{this.props.content.details}</p>
                    </Column>
                    <QuickButton
                        active={this.state.isSelected && this.props.single}
                        onClick={this.handle_onEditClicked}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && this.props.single}
                        delete
                        onClick={this.handle_onDeleteClicked}>
                        Delete
                    </QuickButton>
                </div>
            </div>
        );
    }
}

export default ListItem;