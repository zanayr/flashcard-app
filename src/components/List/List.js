import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction from '../ui/button/Context/ContextAction';
import ContextConfirm from '../ui/button/Context/ContextConfirm';

import listStyles from './List.module.css';

class List extends Component {
    state = {
        selected: [],
        showConfirm: false
    }


    addSelected (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(id)
        }));
    }
    clearAllSelected () {
        this.setState(prev => ({
            ...prev,
            selected: []
        }));
    }
    removeSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.filter(k => k !== key)
        }));
    }

    showConfirm () {
        this.setState(prev => ({
            ...prev,
            showConfirm: true
        }));
    }
    hideConfirm () {
        this.setState(prev => ({
            ...prev,
            showConfirm: false
        }));
    }


    onItemDelete = () => {
        this.showConfirm();
    }
    onItemConfirm = id => {
        this.clearAllSelected();
        this.props.onConfirm(id);
    }
    onItemSelect = id => {
        if (this.state.selected.indexOf(id) > -1) {
            this.removeSelected(id);
        } else {
            this.addSelected(id)
        }
        this.hideConfirm();
        this.props.onSelect(id);
    }


    render () {
        let listItems = Object.keys(this.props.backingCollection).map(id => {
            let item = this.props.backingCollection[id];
            let showContext = this.state.selected.length === 1 && this.state.selected[0] === id;
            if (!item.tags) {
                item.tags = [];
            }
            return (
                <ListItem
                    detail={item.details}
                    display={item.title}
                    tags={item.tags}
                    key={id}
                    onSelect={() => this.onItemSelect(id)}
                    selected={this.state.selected.indexOf(id) > -1}>
                    <ContextAction
                        action={() => this.props.onInspect(id)}
                        active={showContext}>
                        Inspect
                    </ContextAction>
                    <ContextAction
                        action={this.onItemDelete}
                        active={showContext}
                        destructive>
                        Delete
                    </ContextAction>
                    <ContextConfirm
                        action={() => this.onItemConfirm(id)}
                        active={this.state.showConfirm && showContext}>
                        Confirm
                    </ContextConfirm>
                </ListItem>
            );
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