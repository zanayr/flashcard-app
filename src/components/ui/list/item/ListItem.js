import React, {Component} from "react";

import Column from "../../../structure/column/Column";
import QuickButton from "../../button/quick/QuickButton";

import globalCSS from "../../../../Global.module.css";
import listItemCSS from "./ListItem.module.css";

class ListItem extends Component {
    state = {
        details: this.props.content.details,
        id: this.props.content.id,
        title: this.props.content.title,
        isSelected: false
    }

    _itemSelect = () => {
        this.setState(prev => ({
            ...prev,
            isSelected: !prev.isSelected
        }), () => {
            this.props.onSelect({...this.state});
        });
    }

    handle_onClicked = (e) => {
        e.stopPropagation();
        this._itemSelect();
    }
    handle_onEditClicked = () => {
        this.props.onEdit({...this.state});
    }
    handle_onDeleteClicked = () => {
        this.props.onDelete({...this.state});
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
                        <h3>{this.state.id + " " + this.state.title}</h3>
                        <p>{this.state.details}</p>
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