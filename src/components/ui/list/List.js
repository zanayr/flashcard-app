import React, {Component} from "react";

import Aux from "../../../hoc/aux/Aux";
//import Refresh from "../../ui/refresh/Refresh";
import ListItem from "../list/item/ListItem";
import Throbber from "../../ui/throbber/Throbber";

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
    handle_onItemSelected = (id) => {
        this._itemSelect(id);
    }

    render() {
        let items = this.props.listItems.map(item => {
            const isSelected = this.state.selectedItemIDs.indexOf(item.id) > -1;
            return (
                <ListItem
                    data={{
                        ...item,
                        id: item.id
                    }}
                    key={item.id}
                    onDelete={this.handle_onDeleteClicked}
                    onEdit={this.props.onEdit}
                    onSelect={this.handle_onItemSelected}
                    selected={isSelected}
                    single={this.state.isSingle}/>
            );
        });
        let listContent = (
            <div className={globalCSS.Inner}>
                {items}
                {this.props.children}
            </div>
        );

        if (this.props.refreshing) {
            listContent = (
                <div className={globalCSS.Inner}>
                    <Throbber/>
                </div>
            );
        }
        return (
            <Aux>
                <div className={[globalCSS.With_Margin, listCSS.List_Header].join(' ')}>
                    <div className={globalCSS.Inner}>
                        {/*<Refresh/>*/}
                        <h1>{this.props.header}</h1>
                    </div>
                </div>
                <div className={[globalCSS.With_Margin, listCSS.List].join(' ')}>
                    {listContent}
                </div>
            </Aux>
        );
    }
}

export default List;