import React, {Component} from 'react';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction2 from '../ui/button/Context/ContextAction2';

import listStyles from './List.module.css';

class List2 extends Component {
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
                    <ContextAction2
                        action={() => this.props.action(2, item)}
                        active={isActive}
                        key={'aux'}
                        position={1}>
                        {this.props.aux.charAt(0).toUpperCase() + this.props.aux.slice(1).toLowerCase()}
                    </ContextAction2>
                );
                contextPosition++;
            }
            if (this._checkGroups(item) && this._checkTags(item)) {
                return (
                    <ListItem
                        key={item.id}
                        primary={item.primary}
                        secondary={item.secondary}
                        tags={item.tag}
                        selected={isSelected}
                        onSelect={() => this.handle_onItemSelect(item)}>
                        <ContextAction2
                            action={() => this.props.action(1, item)}
                            active={isActive}
                            key={'inspect'}
                            position={contextPosition}>
                            Inspect
                        </ContextAction2>
                        {removeContext}
                        <ContextAction2
                            action={() => this.props.action(3, item)}
                            active={isActive}
                            destructive
                            key={'delete'}
                            position={0}>
                            Delete
                        </ContextAction2>
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


export default List2;