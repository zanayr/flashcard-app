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
        let listItems = this.props.backingCollection.map(item => {
            let showContext = this.state.selected.length === 1 && this.state.selected[0] === item.id;
            return (
                <ListItem
                    detail={item.details}
                    display={item.title}
                    key={item.id}
                    onSelect={() => this.onItemSelect(item.id)}
                    selected={this.state.selected.indexOf(item.id) > -1}>
                    <ContextAction
                        action={this.props.onInspect}
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
                        action={() => this.onItemConfirm(item.id)}
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