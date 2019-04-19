import React, {Component} from "react";

import Column from "../../../structure/column/Column";
import QuickButton from "../../button/quick/QuickButton";

import globalCSS from "../../../../Global.module.css";
import listItemCSS from "./ListItem.module.css";

class ListItem extends Component {
    state = {
        detail: this.props.detail,
        id: this.props.listItemId,
        title: this.props.title,
        selected: false
    }
    handle_itemClicked () {
        this.setState(prevState => ({
            ...prevState,
            selected: !prevState.selected
        }), () => {
            this.props.toggleSelection(this.state.id, this.state.selected);
        });
    }

    render() {
        let cssClasses = [listItemCSS.List_Item];
        if (this.state.selected) {
            cssClasses = [listItemCSS.List_Item, listItemCSS.Selected];
        }
        return (
            <div
                className={cssClasses.join(' ')}
                onClick={this.handle_itemClicked.bind(this)}>
                <div className={globalCSS.Inner}>
                    <Column just="Center_Left">
                        <h3>{this.state.title}</h3>
                        <p>{this.state.detail}</p>
                    </Column>
                    <QuickButton
                        active={this.state.selected && this.props.canQuickEdit}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.selected&& this.props.canQuickEdit}
                        delete>
                        Delete
                    </QuickButton>
                </div>
            </div>
        );
    }
}

export default ListItem;