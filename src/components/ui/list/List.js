import React, {Component} from "react";

import ListItem from "../list/item/ListItem";

import globalCSS from "../../../Global.module.css";
import listCSS from "./List.module.css";

class List extends Component {
    state = {
        isSingle: false,
        selectedItems: [],
        selectedItemIDs: []
    }

    handle_onDeleteClicked = (item) => {
        //  <-- wrap in a confirm box promise here
        this.setState(prev => ({
            ...prev,
            selectedItems: prev.selectedItems.filter(i => i.id !== item.id),
            selectedItemIDs: prev.selectedItemIDs.filter(i => i !== item.id)
        }), () => {
            this.props.onDelete(item);
        });
    }
    handle_onEditClicked = () => {
        this.props.onEdit();
    }
    handle_onItemSelected = (item) => {
        if (this.state.selectedItemIDs.indexOf(item.id) > -1) {
            this.setState(prev => ({
                ...prev,
                selectedItems: prev.selectedItems.filter(i => i.id !== item.id),
                selectedItemIDs: prev.selectedItemIDs.filter(i => i !== item.id)   
            }), () => {
                this.setState(prev => ({
                    ...prev,
                    isSingle: prev.selectedItemIDs.length === 1
                }), () => {
                    if (this.state.isSingle) {
                        this.props.onSelect(item);
                    } else {
                        this.props.onSelect({});
                    }
                });
            });
        } else {
            this.setState(prev => ({
                ...prev,
                selectedItems: [...prev.selectedItems, item],
                selectedItemIDs: [...prev.selectedItemIDs, item.id]   
            }), () => {
                this.setState(prev => ({
                    ...prev,
                    isSingle: prev.selectedItemIDs.length === 1
                }), () => {
                    if (this.state.isSingle) {
                        this.props.onSelect(item);
                    } else {
                        this.props.onEdit();
                        this.props.onSelect({});
                    }
                });
            });
        }
    }

    render() {
        let items = this.props.listItems.map(item => {
            return (
                <ListItem
                    content={item}
                    key={item.id}
                    onDelete={this.handle_onDeleteClicked}
                    onEdit={this.handle_onEditClicked}
                    onSelect={this.handle_onItemSelected}
                    single={this.state.isSingle}/>
            );
        });
        return (
            <div className={listCSS.List}>
                <div className={globalCSS.Inner}>
                    {items}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default List;