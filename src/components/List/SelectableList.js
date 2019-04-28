import React, {Component} from 'react';

import ContextAction from '../ui/button/Context/ContextAction';
import SelectableListItem from '../ui/ListItem/SelectableListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';


class SelectableList extends Component {
    state = {
        collection: this.props.backingCollection,
        confirm: false,
        deleted: [],
        hidden: [],
        selected: []
    }

    setConfirm (payload) {
        this.setState(previous => ({
            ...previous,
            confirm: payload
        }));
    }
    setDeleted (payload) {
        this.setState(previous => ({
            ...previous,
            deleted: previous.deleted.concat(payload)
        }));
        this.setState(previous => ({
            ...previous,
            selected: []
        }));
    }
    setSelected (payload) {
        if (this.state.selected.indexOf(payload.key) > -1) {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.filter(key => key !== payload.key)
            }));
        } else {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.concat(payload.key)
            }));
        }
    }

    onDeleteConfirm = (payload) => {
        this.setConfirm(false);
        this.setDeleted(payload);
        this.props.onConfirm(payload);
    }
    onItemDelete = (payload) => {
        this.setConfirm(true);
    }
    onItemSelect = (payload) => {
        this.setConfirm(false);
        this.setSelected(payload);
        //this.props.onSelect(payload);
    }
    onRowDestory = payload => {
        console.log('destroying:', payload);
    }

    render () {
        let items = this.props.backingCollection.map(item => {
            let isSingle = this.state.selected.length === 1 && this.state.selected[0] === item.key;
            let css = [ListCSS.List_Item]
            if (item.isNew) {
                css.push(ListCSS.New);
            }
            if (this.state.deleted.indexOf(item.key) > -1) {
                css.push(ListCSS.Hidden);
            }
            return (
                <section
                    className={css.join(' ')}
                    key={item.key}>
                    <div>
                        <SelectableListItem
                            onSelect={this.onItemSelect}
                            display={item.title}
                            detail={item.details}
                            itemKey={item.key}/>
                        <ContextAction
                            action={this.props.onEdit}
                            active={isSingle}
                            itemKey={item.key}>
                            Edit
                        </ContextAction>
                        <ContextAction
                            action={this.onItemDelete}
                            active={isSingle}
                            destructive
                            itemKey={item.key}>
                            Delete
                        </ContextAction>
                        <ContextAction
                            action={this.onDeleteConfirm}
                            active={this.state.confirm && isSingle}
                            confirm
                            itemKey={item.key}>
                            Confirm
                        </ContextAction>
                    </div>
                </section>
            );
        });
        return (
            <div className={ListCSS.List}>
                <div className={AppCSS.Inner}>
                    {items}
                </div>
            </div>
        )
    }
}


export default SelectableList;