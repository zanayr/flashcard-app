import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction from '../ui/button/Context/ContextAction';

import styles from './List.module.css';

class List extends Component {
    _checkGroups (item) {
        const groups = this.props.current.group.concat(this.props.filters.group);
        if (groups.length) {
            if (item.group.length) {
                let match = true;
                groups.forEach(tag => {
                    match = item.group.includes(tag) && match
                });
                return match;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    _checkSearch (item) {
        const term = this.props.filters.search;
        if (term.length) {
            if (item.primary.toUpperCase().match('^' + term) || item.primary.toUpperCase().match('^' + term)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    _checkTags (item) {
        const tags = this.props.current.tag.concat(this.props.filters.tag);
        if (tags.length) {
            let match = false;
            tags.forEach(tag => {
                match = item.tag.includes(tag) || match
            });
            return match;
        } else {
            return true;
        }
    }
    

    handle_onItemSelect = (item) => {
        this.props.action(0, item);
    }

    render () {
        let removeContext = null;
        let listItems = this.props.collection.map(item => {
            let isSelected = typeof this.props.selected.find(i => i.id === item.id) === 'object';
            let isActive = isSelected && this.props.selected.length === 1;
            let contextPosition = 1;
            if (this.props.aux) {
                removeContext = (
                    <ContextAction
                        action={() => this.props.action(2, item)}
                        active={isActive}
                        confirm
                        key={'aux'}
                        position={1}>
                        {this.props.aux.charAt(0).toUpperCase() + this.props.aux.slice(1).toLowerCase()}
                    </ContextAction>
                );
                contextPosition++;
            }
            if (this._checkGroups(item) && this._checkTags(item) && this._checkSearch(item)) {
                return (
                    <ListItem
                        data={item}
                        default={this.props.default}
                        key={item.id}
                        selected={isSelected}
                        onSelect={() => this.handle_onItemSelect(item)}>
                        <ContextAction
                            action={() => this.props.action(1, item)}
                            active={isActive}
                            key={'inspect'}
                            position={contextPosition}>
                            Inspect
                        </ContextAction>
                        {removeContext}
                        <ContextAction
                            action={() => this.props.action(3, item)}
                            active={isActive}
                            confirm
                            destructive
                            key={'delete'}
                            position={0}>
                            Delete
                        </ContextAction>
                    </ListItem>
                );
            } else {
                return null;
            }
        });
        return (
            <section className={styles.List}>
                <div>
                    {listItems}
                </div>
            </section>
        );
    }
}


export default List;