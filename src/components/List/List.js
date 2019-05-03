import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction from '../ui/button/Context/ContextAction';
import ContextConfirm from '../ui/button/Context/ContextConfirm';

import listStyles from './List.module.css';

class List extends Component {
    state = {
        selected: [],
        confirm: false
    }


    addSelected (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(id)
        }));
    }
    // clearAllSelected () {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: []
    //     }));
    // }
    removeSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.filter(k => k !== key)
        }));
    }

    showConfirm () {
        this.setState(prev => ({
            ...prev,
            confirm: true
        }));
    }
    hideConfirm () {
        this.setState(prev => ({
            ...prev,
            confirm: false
        }));
    }


    onItemDelete = () => {
        this.showConfirm();
    }
    onItemConfirm = (item) => {
        this.removeSelected(item.id);
        this.props.onConfirm(item);
    }
    onItemSelect = (item) => {
        if (this.state.selected.indexOf(item.id) > -1) {
            this.removeSelected(item.id);
        } else {
            this.addSelected(item.id)
        }
        this.hideConfirm();
        this.props.onSelect(item);
    }


    checkFilter (item) {
        let match = true;
        if (this.props.filters.tags.length) {
            this.props.filters.tags.forEach(tag => {
                if (item.tags.indexOf(tag) < 0 && match) {
                    match = false;
                }
            });
        }
        if (this.props.filters.groups.length) {
            this.props.filters.groups.forEach(group => {
                if (item.groups.indexOf(group) < 0 && match) {
                    match = false;
                }
            });
        }
        return match;
    }

    render () {
        let listItems = this.props.backingCollection.map(item => {
            if (this.checkFilter(item)) {
                return (
                    <ListItem
                        key={item.id}
                        primary={item.primary}
                        secondary={item.secondary}
                        tags={item.tags}
                        selected={item.isSelected}
                        onSelect={() => this.onItemSelect(item)}>
                        <ContextAction
                            action={() => this.props.onInspect(item)}
                            active={item.isSelected && this.state.selected.length === 1}>
                            Inspect
                        </ContextAction>
                        <ContextAction
                            action={this.onItemDelete}
                            active={item.isSelected && this.state.selected.length === 1}
                            destructive>
                            Delete
                        </ContextAction>
                        <ContextConfirm
                            action={() => this.onItemConfirm(item)}
                            active={this.state.confirm && item.isSelected && this.state.selected.length === 1}>
                            Confirm
                        </ContextConfirm>
                    </ListItem>
                );
            } else {
                return null;
            }
        });
        return (
            <section className={listStyles.List}>
                <div>
                    {listItems}
                </div>
            </section>
        );
    }
}


export default List;