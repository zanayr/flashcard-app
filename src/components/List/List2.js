import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import ListItem from '../ui/ListItem/ListItem';
import ContextAction2 from '../ui/button/Context/ContextAction2';
import ContextConfirm from '../ui/button/Context/ContextConfirm';

import listStyles from './List.module.css';

class List2 extends Component {
    state = {
        confirm: false
    }

    _showConfirm () {
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
    onItemSelect = (item) => {
        //this.hideConfirm();
        this.props.actions.select(item);
    }
    _checkTags (item) {
        const tags = this.props.filters.tag.slice();
        if (tags.length) {
            let match = false;
            item.tag.forEach(tag => {
                match = tags.includes(tag) || match;
            });
            return match;
        } else {
            return true;
        }
    }
    _checkGroups (item) {
        const groups = this.props.filters.group.slice();
        if (groups.length) {
            if (item.group.length) {
                let match = true;
                item.group.forEach(tag => {
                    match = groups.includes(tag) && match;
                });
                return match;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    render () {
        let removeContext = null;
        let listItems = this.props.collection.map(item => {
            let isSelected = typeof this.props.selected.find(i => i.id === item.id) === 'object';
            let isActive = isSelected && this.props.selected.length === 1;
            let contextPosition = 1;
            if (typeof this.props.actions.remove !== undefined) {
                removeContext = (
                    <ContextAction2
                        action={() => this.props.actions.remove(item)}
                        active={isActive}
                        destructive
                        position={1}>
                        Remove
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
                        onSelect={() => this.onItemSelect(item)}>
                        <ContextAction2
                            action={() => this.props.actions.inspect(item)}
                            active={isActive}
                            position={contextPosition}>
                            Inspect
                        </ContextAction2>
                        {removeContext}
                        <ContextAction2
                            action={() => this.props.actions.delete(item)}
                            active={isActive}
                            destructive
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


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteDeck_async: (token, item) => dispatch(actions.deleteDeck_async(token, item)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(List2);