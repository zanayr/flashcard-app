import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../aside/Aside/asideTypes';
import * as modalTypes from '../modal/Modal/modalTypes';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import ReturnLink from '../ui/link/Return/ReturnLink';
import Search from '../ui/input/Search/Search';
import Toolbar from '../ui/bar/Toolbar/Toolbar';
import Dashboard from '../ui/Dashboard/Dashboard';
import IconButton from '../ui/button/Icon/IconButton';

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
            this.props.deleteManyDecks_async(this.props.select_token, this.props.selected.slice());
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
            let merged = create.deckViewModel(utility.createHashId(0), {
                groups: groups,
                owner: this.props.select_userId,
                primary: 'New Merged Deck',
                tags: tags
            });
            this.props.addDeck_async(this.props.select_token, merged);
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
                let primary;
                if (item.primary.length <= 24) {
                    primary = 'Copy of ' + item.primary;
                } else {
                    primary = 'Copy of ' + item.primary.substr(0, 21) + '...';
                }
                cloned.push(create.deckViewModel(utility.createHashId(i), {
                    ...item,
                    primary: primary
                }));
            });
            this.props.addManyDecks_async(this.props.select_token, cloned);
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
                    <Toolbar>
                        <IconButton onClick={() => this.props.actions.toggle(asideTypes.FILTER_TAG)}>T</IconButton>
                        <IconButton onClick={() => this.props.actions.toggle(asideTypes.FILTER_GROUP)}>G</IconButton>
                        <IconButton
                            disabled={!this.props.selected.length}
                            onClick={this.handle_onSelectedDelete}>D</IconButton>
                        {this.props.page === 'deck' ? (
                                <IconButton
                                    disabled={!(this.props.selected.length > 1)}
                                    onClick={this.handle_onSelectedMerge}>
                                    M
                                </IconButton>
                            ) : (null)}
                        <IconButton
                            disabled={!this.props.selected.length}
                            onClick={this.handle_onSelectedClone}>C</IconButton>
                        <IconButton onClick={() => this.props.actions.sort(sortTypes.ALPHA_ASC)}>AA</IconButton>
                        <IconButton onClick={() => this.props.actions.sort(sortTypes.ALPHA_DSC)}>AD</IconButton>
                        <IconButton onClick={() => this.props.actions.sort(sortTypes.DATE_ASC)}>DA</IconButton>
                        <IconButton onClick={() => this.props.actions.sort(sortTypes.DATE_DSC)}>DD</IconButton>
                    </Toolbar>
                    <Dashboard onNavigation={() => this.props.actions.toggle(1)}/>
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
        deleteManyDecks_async: (token, items) => dispatch(actions.deleteManyDecks_async(token, items)),
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel)),
        addDeck_async: (token, item) => dispatch(actions.addDeck_async(token, item)),
        addManyDecks_async: (token, items) => dispatch(actions.addManyDecks_async(token, items))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);