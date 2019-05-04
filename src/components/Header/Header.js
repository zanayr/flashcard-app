import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as modalTypes from '../modal/Modal/modalTypes';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import ReturnLink from '../ui/link/Return/ReturnLink';
import Search from '../ui/input/Search/Search';
import Toolbar from '../ui/Toolbar/Toolbar';
import Dashboard from '../ui/Dashboard/Dashboard';

import styles from './Header.module.css';

class Header extends Component {
    state = {
        collection: this.props.collection,
        selected: this.props.selected
    }

    handle_onClick = (e) => {
        e.stopPropagation();
        this.props.onClick();
    }

    handle_onSelectedDelete = () => {
        this.props.displayModal_async(
            modalTypes.WARNING,
            'Once you delete an item, it cannot be recovered. Are you sure you wish to delete these items?',
            'Delete', 'Cancel')
        .then(response => {
            this.props.deleteManyItems_async(this.props.select_token, this.props.selected.slice());
            this.props.actions.delete();
        }).catch(() => {}); // Eat user cancel
    };

    handle_onSelectedMerge = () => {
        this.props.displayModal_async(
            modalTypes.DEFAULT,
            'Are you sure you wish to merge these decks into one deck?',
            'Merge', 'Cancel')
        .then(response => {
            const tags = [];
            const groups = [];
            this.props.selected.forEach(item => {
                item.tags.forEach(tag => {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                });
                item.groups.forEach(tag => {
                    if (!groups.includes(tag)) {
                        groups.push(tag);
                    }
                })
            });
            let merged = create.itemViewModel(utility.createHashId(0), {
                date: Date.now(),
                groups: groups,
                meta: {},
                notes: '',
                owner: this.props.select_userId.id,
                primary: 'New Merged Deck',
                secondary: '',
                tags: tags,
                type: 'deck',
            });

            this.props.patchItem_async(this.props.select_token, merged);
            this.props.actions.create([merged]);
        }).catch(() => {}); // Eat user cancel
    };

    handle_onSelectedClone = () => {
        this.props.displayModal_async(
            modalTypes.DEFAULT,
            'Are you sure you wish to close these items?',
            'Clone', 'Cancel')
        .then(response => {
            const cloned = [];
            this.props.selected.map((item, i) => {
                if (item.primary.length <= 24) {
                    item.primary = 'Copy of ' + item.primary;
                } else {
                    item.primary = 'Copy of ' + item.primary.substr(0, 21) + '...';
                }
                cloned.push(create.itemViewModel(utility.createHashId(i), item));
            });
            this.props.patchManyItems_async(this.props.select_token, cloned);
            this.props.actions.create(cloned);
        }).catch(() => {}); // Eat user cancel
    };

    render () {
        return (
            <header
                className={styles.Header}
                onClick={(e) => this.handle_onClick(e)}>
                <div>
                    <ReturnLink/>
                    <Search/>
                    <Toolbar
                        single={this.props.selected.length}
                        merge={this.props.selected.length > 1 && this.props.selected[0].type === 'deck'}
                        onA={() => this.props.actions.toggle(2)}
                        onB={() => this.props.actions.toggle(3)}
                        onC={this.handle_onSelectedDelete}
                        onD={this.handle_onSelectedMerge}
                        onE={this.handle_onSelectedClone}
                        onAA={() => this.props.actions.sort(sortTypes.ALPHA_ASC)}
                        onAD={() => this.props.actions.sort(sortTypes.ALPHA_DSC)}
                        onDA={() => this.props.actions.sort(sortTypes.DATE_ASC)}
                        onDD={() => this.props.actions.sort(sortTypes.DATE_DSC)}
                        />
                    <Dashboard
                        onNavigation={() => this.props.actions.toggle(1)}/>
                </div>
            </header>
        );
    }
}


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state),
        select_userId: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteManyItems_async: (token, items) => dispatch(actions.deleteManyItems_async(token, items)),
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel)),
        patchItem_async: (token, item) => dispatch(actions.patchItem_async(token, item)),
        patchManyItems_async: (token, items) => dispatch(actions.patchManyItems_async(token, items))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);