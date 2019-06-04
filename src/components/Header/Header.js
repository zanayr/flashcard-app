import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as headerTypes from '../Header/types';
import * as modalTypes from '../modal/Modal/modalTypes';

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
        console.log('here');
        this.props.displayModal_async(
            modalTypes.RESPONSE,
            'What would you like to name the new merged deck?',
            'Merge', 'Cancel')
        .then(response => {
            this.props.actions.action(2, response);
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
        let filter = null;
        let aux1 = null;
        let aux2 = null;
        switch (this.props.state) {
            case headerTypes.COLLECTION:
                filter = (<IconButton onClick={this.props.actions.filter}>F</IconButton>);
                aux1 = (
                    <IconButton
                        disabled={!(this.props.selected.length > 1)}
                        onClick={this.handle_onSelectedMerge}>M</IconButton>
                );
                aux2 = (
                    <IconButton
                        disabled={!this.props.selected.length}
                        onClick={this.handle_onSelectedClone}>C</IconButton>
                );
                break;
            case headerTypes.ITEM:
                filter = (<IconButton onClick={this.props.actions.filter}>F</IconButton>);
                aux1 = (
                    <IconButton
                        disabled={!this.props.selected.length}
                        onClick={this.handle_onSelectedClone}>C</IconButton>
                );
                break;
            default:
                break;
        }
        return (
            <header
                className={styles.Header}
                onClick={(e) => this.handle_onClick(e)}>
                <div>
                    <ReturnLink/>
                        <div className={styles.Toolbar}>
                            <Search onChange={this.props.actions.search}/>
                            <Toolbar>
                                {filter}
                                <IconButton
                                    disabled={!this.props.selected.length}
                                    onClick={this.handle_onSelectedDelete}>D</IconButton>
                                {aux1}
                                {aux2}
                                <IconButton onClick={() => this.props.actions.sort(0)}>AA</IconButton>
                                <IconButton onClick={() => this.props.actions.sort(1)}>AD</IconButton>
                                <IconButton onClick={() => this.props.actions.sort(2)}>DA</IconButton>
                                <IconButton onClick={() => this.props.actions.sort(3)}>DD</IconButton>
                            </Toolbar>
                        </div>
                    <Dashboard onNavigation={this.props.actions.navigation}/>
                </div>
            </header>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel)),
    };
};


export default connect(null, mapDispatchToProps)(Header);