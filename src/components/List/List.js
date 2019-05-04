import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction from '../ui/button/Context/ContextAction';
import ContextConfirm from '../ui/button/Context/ContextConfirm';

import listStyles from './List.module.css';

class List extends Component {
    state = {
        confirm: false
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
        this.props.onConfirm([item]);
    }
    onItemSelect = (item) => {
        this.hideConfirm();
        this.props.onSelect(item);
    }


    checkFilter (item) {
        let match = true;
        if (this.props.filters.tags.length) {
            match = false;
            this.props.filters.tags.forEach(tag => {
                match = item.tags.includes(tag) || match;
            });
        }
        if (this.props.filters.groups.length) {
            match = false;
            this.props.filters.groups.forEach(tag => {
                match = item.groups.includes(tag) && match;
            });
        }
        return match;
    }

    render () {
        let listItems = this.props.backingCollection.map(item => {
            let isSelected = typeof this.props.selected.find(i => i.id === item.id) === 'object';
            let isActive = isSelected && this.props.selected.length === 1;
            if (this.checkFilter(item)) {
                return (
                    <ListItem
                        key={item.id}
                        primary={item.primary}
                        secondary={item.secondary}
                        tags={item.tags}
                        selected={isSelected}
                        onSelect={() => this.onItemSelect(item)}>
                        <ContextAction
                            action={() => this.props.onInspect(item)}
                            active={isActive}>
                            Inspect
                        </ContextAction>
                        <ContextAction
                            action={this.onItemDelete}
                            active={isActive}
                            destructive>
                            Delete
                        </ContextAction>
                        <ContextConfirm
                            action={() => this.onItemConfirm(item)}
                            active={this.state.confirm && isActive}>
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