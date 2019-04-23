import React, {Component} from 'react';

import Aux from '../../../hoc/aux/Aux';
import ListItem from '../list/item/ListItem';

import globalCSS from '../../../Global.module.css';
import listCSS from './List.module.css';

class List extends Component {
    state = {
        isSingle: false,
        selectedItemIDs: [],
        deletedItems: [...this.props.deletedITems]
    }

    updateIsSingle = () => {
        this.setState(prev => ({
            ...prev,
            isSingle: prev.selectedItemIDs.length === 1
        }));
    }
    selectItem = (id) => {
        if (this.state.selectedItemIDs.indexOf(id) > -1) {
            this.setState(prev => ({
                ...prev,
                selectedItemIDs: prev.selectedItemIDs.filter(i => i !== id)
            }), () => {
                this.updateIsSingle(id);
                this.props.onSelect({
                    data: {
                        id: id
                    }
                });
            });
        } else {
            this.setState(prev => ({
                ...prev,
                selectedItemIDs: [...prev.selectedItemIDs, id]
            }), () => {
                this.updateIsSingle();
                this.props.onSelect({
                    data: {
                        id: id
                    }
                });
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

    handle_onEditClick = (id) => {
        this.props.onEdit({
            id: id,
            state: 99
        });
    }
    handle_onDeleteClick = (data) => {
        this._itemDelete(data);
    }
    handle_onItemSelect = (data) => {
        this.selectItem(data.id);
    }

    render() {
        console.log('***', this.state.deletedItems);
        let items = Object.keys(this.props.listItems).map(key => {
            return (
                <ListItem
                    data={{
                        ...this.props.listItems[key],
                        id: key
                    }}
                    key={key}
                    deleted={this.state.deletedItems.indexOf(key) > -1}
                    onDelete={this.handle_onDeleteClicked}
                    onEdit={this.handle_onEditClick}
                    onSelect={this.handle_onItemSelect}
                    selected={this.state.selectedItemIDs.indexOf(key) > -1}
                    single={this.state.isSingle}/>
            );
        });
        return (
            <Aux>
                <div className={[globalCSS.With_Margin, listCSS.List_Header].join(' ')}>
                    <div className={globalCSS.Inner}>
                        {/*<Refresh/>*/}
                        <h1>{this.props.header}</h1>
                    </div>
                </div>
                <div className={[globalCSS.With_Margin, listCSS.List].join(' ')}>
                    <div className={globalCSS.Inner}>
                        {items}
                        {this.props.children}
                    </div>
                </div>
            </Aux>
        );
    }
}

export default List;