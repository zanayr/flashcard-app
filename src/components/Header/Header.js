import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../aside/Aside/asideTypes';
import * as headerTypes from '../Header/types';
import * as modalTypes from '../modal/Modal/modalTypes';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import Aux from '../../hoc/Aux/Aux';
import ReturnLink from '../ui/link/Return/ReturnLink';
import BarLink from '../ui/link/Bar/BarLink';
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
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    handle_onSelectedDelete = () => {
        this.props.displayModal_async(
            modalTypes.WARNING,
            'Once you delete an item, it cannot be recovered. Are you sure you wish to delete these items?',
            'Delete', 'Cancel')
        .then(response => {
            this.props.actions.action(0);
        }).catch(() => {}); // Eat user cancel
    };

    handle_onSelectedMerge = () => {
        this.props.displayModal_async(
            modalTypes.RESPONSE,
            'What would you like to name the new merged deck?',
            'Merge', 'Cancel')
        .then(response => {
            this.props.actions.action(2, response);
            // const tags = [];
            // const groups = [];
            // this.props.selected.forEach(item => {
            //     item.tags.forEach(tag => {
            //         if (!tags.includes(tag)) {
            //             tags.push(tag);
            //         }
            //     });
            //     item.groups.forEach(tag => {
            //         if (!groups.includes(tag)) {
            //             groups.push(tag);
            //         }
            //     });
            // });
            // let merged = create.deckViewModel(utility.createHashId(0), {
            //     groups: groups,
            //     owner: this.props.select_userId,
            //     primary: response || 'New Merged Deck',
            //     tags: tags
            // });
            // this.props.addDeck_async(this.props.select_token, merged);
            // this.props.actions.create([merged]);
        }).catch(() => {}); // Eat user cancel
    };

    handle_onSelectedClone = () => {
        this.props.displayModal_async(
            modalTypes.DEFAULT,
            'Are you sure you wish to close these items?',
            'Clone', 'Cancel')
        .then(response => {
            this.props.actions.action(1);
        }).catch(() => {}); // Eat user cancel
    };

    render () {
        let content = null;
        switch (this.props.state) {
            case headerTypes.COLLECTION:
                content = (
                    <Aux>
                        <Search/>
                        <Toolbar>
                            <IconButton onClick={() => this.props.actions.filter(0)}>T</IconButton>
                            <IconButton onClick={() => this.props.actions.filter(1)}>G</IconButton>
                            <IconButton
                                disabled={!this.props.selected.length}
                                onClick={this.handle_onSelectedDelete}>D</IconButton>
                            <IconButton
                                disabled={!(this.props.selected.length > 1)}
                                onClick={this.handle_onSelectedMerge}>
                                M
                            </IconButton>
                            <IconButton
                                disabled={!this.props.selected.length}
                                onClick={this.handle_onSelectedClone}>C</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(0)}>AA</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(1)}>AD</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(2)}>DA</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(3)}>DD</IconButton>
                        </Toolbar>
                    </Aux>
                );
                break;
            case headerTypes.INSPECTOR:
                content = (
                    <Aux>
                        <Search/>
                        <Toolbar>
                            <IconButton onClick={() => this.props.actions.filter(0)}>T</IconButton>
                            <IconButton onClick={() => this.props.actions.filter(1)}>G</IconButton>
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
                            <IconButton onClick={() => this.props.actions.sort(0)}>AA</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(1)}>AD</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(2)}>DA</IconButton>
                            <IconButton onClick={() => this.props.actions.sort(3)}>DD</IconButton>
                        </Toolbar>
                    </Aux>
                );
                break;
            case headerTypes.NAVIGATION:
                content = (
                    <Aux>
                        <BarLink
                            path={this.props.back}
                            state={{}}>
                            Back
                        </BarLink>
                    </Aux>
                );
                break;
        }
        return (
            <header
                className={styles.Header}
                onClick={(e) => this.handle_onClick(e)}>
                <div>
                    <ReturnLink/>
                    {content}
                    <Dashboard onNavigation={this.props.actions.navigation}/>
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