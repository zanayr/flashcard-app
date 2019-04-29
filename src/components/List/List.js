import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';

import listStyles from './List.module.css';

class List extends Component {
    state = {
        selected: []
    }
    

    addSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(key)
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


    onItemSelect = key => {
        if (this.state.selected.indexOf(key) > -1) {
            this.removeSelected(key);
        } else {
            this.addSelected(key)
        }
        this.onSelect(key);
    }


    render () {
        // let listItems = this.props.backingCollection.map(item => {
        //     let isActive = this.state.selected.length === 1 && this.state.selected[0] === item.key;
        //     let isConfirm = this.state.confirm && isActive;
        //     return (
        //         <ListItem
        //             detail={item.details}
        //             display={item.title}
        //             key={item.key}>
        //         </ListItem>
        //     );
        // });

        return (
            <section className={listStyles.List}>
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}


export default List;