import React, {Component} from "react";

import ListItem from "../list/item/ListItem";

import globalCSS from "../../../Global.module.css";
import listCSS from "./List.module.css";

class List extends Component {
    state = {
        isSingle: false,
        selectedItemIDs: []
    }

    _isSingleUpdate = (id) => {
        this.setState(prev => ({
            ...prev,
            isSingle: prev.selectedItemIDs.length === 1
        }), () => {
            if (this.state.isSingle) {
                this.props.onSelect(id);
            } else {
                this.props.onSelect('');
            }
        });
    }
    _itemSelect = (id) => {
        if (this.state.selectedItemIDs.indexOf(id) > -1) {
            this.setState(prev => ({
                ...prev,
                selectedItemIDs: prev.selectedItemIDs.filter(i => i !== id)
            }), () => {
              this._isSingleUpdate(id);
            });
        } else {
            this.setState(prev => ({
                ...prev,
                selectedItemIDs: [...prev.selectedItemIDs, id]
            }), () => {
              this._isSingleUpdate(id);
            });
        }
    }
    _itemDelete = (id) => {
        this.setState(prev => ({
            ...prev,
            selectedItemIDs: prev.selectedItemIDs.filter(i => i !== id)
        }), () => {
            this.setState(prev => ({
                ...prev,
                isSingle: prev.selectedItemIDs.length === 1
            }), () => {
                this.props.onDelete(id);
            });
        });
    }


    handle_onDeleteClicked = (id) => {
        //  <-- wrap in a confirm box promise here
        this._itemDelete(id);
    }
    handle_onEditClicked = () => {
        this.props.onEdit();
    }
    handle_onItemSelected = (id) => {
        this._itemSelect(id);
    }

    render() {
        let items = Object.keys(this.props.listItems).map(itemKey => {
            const item = {...this.props.listItems[itemKey]};
            return (
                <ListItem
                    content={{
                        details: item.details,
                        id: itemKey,
                        title: item.title
                    }}
                    key={itemKey}
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