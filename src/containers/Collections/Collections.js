import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as sortType from '../../store/reducers/sortTypes';
import * as utility from '../../utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import TabBar from '../../components/ui/tab/TabBar/TabBar';
import TabForm from '../../components/form/Tab/TabForm';

import AppCSS from '../../App.module.css';
import CollectionsCSS from './Collections.module.css';

class Collections extends Component {
    state = {
        action: {
            state: 0
        },
        aside: {
            actions: {},
            data: {},
            isActive: false,
            state: 0
        },
        showConfirm: false,
        deleted: [],
        decks: {},
        cards: {},
        history: {
            store: {},
            undo: null
        },
        selected: [],
        state: 'decks',
        tabs: {
            actions: {},
            cards: {
                isActive: false,
                canDelete: false
            },
            decks: {
                isActive: true,
                canDelete: false
            }
        },
        filters: {
            tags: [],
            groups: []
        },
        user: {
            tags: ['foo', 'bar', 'spam'],
            groups: ['fizz', 'buzz']
        }
    }

    componentDidMount () {
        this.setState(prev => ({
            ...prev,
            decks: this.props.select_decks,
            cards: this.props.select_cards
        }));
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...prev.tabs,
                ...this.props.select_userTabs,
                actions: {
                    add: this.handle_onTabAdd,
                    click: this.handle_onTabBarClick,
                    close: this.handle_onTabRemove,
                    toggle: this.handle_onTabToggle,
                }
            }
        }));
    }



    //  STATE SETTERS v2  //
    //  Aside  -------------------------------------------------------------  Aside  //
    setAsideData (data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...data
                }
            }
        }));
    }
    setAsideAction (actions) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {
                    ...actions
                }
            }
        }));
    }
    setAsideState (state) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: state
            }
        }));
    }
    toggleAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                isActive: !prev.aside.isActive
            }
        }));
    }

    //  List  ---------------------------------------------------------------  List  //
    addSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(key)
        }));
    }
    clearSelected (key) {
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
    setConfirm (bool) {
        this.setState(prev => ({
            ...prev,
            confirm: bool
        }));
    }
    toggleConfirm () {
        this.setState(prev => ({
            ...prev,
            confirm: !prev.confirm
        }));
    }

    createItem (item) {
        this.setState(prev => ({
            ...prev,
            [this.state.state]: {
                ...prev[this.state.state],
                [item.id]: item
            }
        }));
    }
    removeItem (id) {
        const collection = this.state.decks;
        delete collection[id];
        this.setState(prev => ({
            ...prev,
            decks: {...collection}
        }));
    }
    updateItem (id, target, value) {
        this.setState(prev => ({
            ...prev,
            [this.state.state]: {
                ...prev[this.state.state],
                [id]: {
                    ...prev[this.state.state][id],
                    [target]: value
                }
            }
        }));
    }
    getItemById (id) {
        return {
            ...this.state.decks[id],
            id: id
        }
    }
    clearAsideData () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {}
            }
        }));
    }
    clearAsideActions () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {}
            }
        }));
    }
    resetItem = () => {
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,
                [this.state.history.last.id]: {
                    ...this.state.history.last
                }
            }
        }));
    }
    setHistory (data) {
        this.setState(prev => ({
            ...prev,
            history: {
                ...data
            }
        }));
    }
    toggleTabs (tab) {
        const tabs = this.state.tabs;
        Object.keys(tabs).forEach(t => {
            if (t === tab) {
                tabs[t].isActive = true;
            } else if (tabs[t].isActive) {
                tabs[t].isActive = false;
            }
        });
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
    }

    //  EVENT HANDLERS v2  //
    onActionClick = () => {
        let id = utility.createHashId(0);
        let item;
        if (this.state.state === 'decks') {
            item = {
                details: 'These are details for this flashcard',
                id: id,
                title: id + ' Flashcard Deck',
                user: this.props.select_user
            }
        } else {
            item = {
                details: 'These are details for this card',
                id: id,
                title: id + ' Flashcard',
                user: this.props.select_user
            }
        }
        this.createItem(item);
        this.props.patch_async(this.state.state, this.props.select_token, item);
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    onAsideClose = state => {
        if (this.state.aside.isActive) {
            this.clearAsideActions();
            this.clearAsideData();
            this.toggleAside();
            if (this.state.aside.state === 99) {
                this.state.history.undo();
                this.setAsideState(0);
            }
        }
    }
    onAsideToggle = state => {
        if (this.state.aside.state === state) {
            this.toggleAside();
        } else {
            this.setAsideState(state);
            if (!this.state.aside.isActive) {
                this.toggleAside();
            }
        }
    }

    //  List  ---------------------------------------------------------------  List  //
    onListOut = () => {
        if (this.state.aside.isActive) {
            this.onAsideClose();
        }
    }
    onItemDelete = id => {
        this.removeSelected(id);
        this.removeItem(id);
        this.props.delete_async(this.state.state, this.props.select_token, id);
    }
    onItemUpdate = () => {
        this.clearAsideData();
        this.clearAsideActions();
        this.handle_onCloseQuickInspect();
        //this.clearSelected();
        this.props.put_async(this.state.state, this.props.select_token, this.getItemById(this.state.aside.data.id));
    }
    onItemFilterAdd = (filter, name) => {
        let id = this.state.aside.data.id;
        let current = this.state.state;
        this.setState(prev => ({
            ...prev,
            [current]: {
                ...prev[current],
                [id]: {
                    ...prev[current][id],
                    [filter]: prev[current][id][filter].concat(name)
                }
            }
        }));
    }
    onItemFilterRemove = (filter, name) => {
        let id = this.state.aside.data.id;
        let current = this.state.state;
        this.setState(prev => ({
            ...prev,
            [current]: {
                ...prev[current],
                [id]: {
                    ...prev[current][id],
                    [filter]: prev[current][id][filter].filter(n => n !== name)
                }
            }
        }));
    }
    onItemChange = (target, value) => {
        this.updateItem(this.state.aside.data.id, target, value);
    }
    onItemInspect = id => {
        this.setAsideState(99);
        this.toggleAside();
        this.setAsideData(this.getItemById(id));
        this.setHistory({
            last: this.getItemById(id),
            undo: this.resetItem
        });
        this.setAsideAction({
            onChange: this.onItemChange,
            onConfirm: this.onItemUpdate,
            onAdd: this.onItemFilterAdd,
            onRemove: this.onItemFilterRemove
        });
    }
    onItemSelect = id => {
        this.setConfirm(false);
        if (this.state.selected.indexOf(id) > -1) {
            this.removeSelected(id);
        } else {
            this.addSelected(id)
        }
        if (this.state.aside.isActive && this.state.aside.state === 99) {
            this.onAsideClose();
        }
    }

    handle_onTabCreate = tab => {
        let t = {
            canDelete: true,
            id: utility.createHashId(0),
            isActive: false,
            name: tab.name
        }
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...prev.tabs,
                [t.id]: t
            }
        }));
        this.setState(prev => ({
            ...prev,
            [t.id]: {}
        }));
        this.setState(prev => ({
            ...prev,
            state: t.id
        }));
        this.props.patchUserTab_async(this.props.select_token, this.props.select_userId, t);
    }
    handle_onTabAdd = tab => {
        this.setState(prev => ({
            ...prev,
            state: 0
        }));
    }
    handle_onCloseQuickInspect = () => {
        this.setState(prev => ({
            ...prev,
            aside: {
                isActive: false,
                state: 0,
            }
        }))
    }
    handle_onTabRemove = tab => {
        let tabs = this.state.tabs;
        delete tabs[tab];
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
        this.props.deleteUserTab_async(this.props.select_token, this.props.select_userId, tab);
    }
    handle_onTabToggle = tab => {
        const tabs = this.state.tabs;
        Object.keys(tabs).forEach(t => {
            if (t === tab) {
                tabs[t].isActive = true;
            } else if (tabs[t].isActive) {
                tabs[t].isActive = false;
            }
        });
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
        this.setState(prev => ({
            ...prev,
            state: tab
        }));
    }

    handle_onItemDelete = id => {
        this.removeSelected(id);
        this.removeItem(id);
        this.props.delete_async(this.state.state, this.props.select_token, id);
    }

    toggleFilter = (category, filter) => {
        if (this.state.filters[category].indexOf(filter) > -1) {
            this.setState(prev => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    [category]: prev.filters[category].filter(f => f !== filter)
                }
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    [category]: prev.filters[category].concat(filter)
                }
            }));
        }
    }

    handle_onFilterOpen = category => {
        this.setAsideState(2);
        this.setAsideData({
            filters: this.state.user[category],
            category: category
        });
        this.setAsideAction({
            onToggle: this.toggleFilter,
        });
        this.toggleAside();
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let content = (
            <p>Something when wrong...</p>
        );
        if (!this.state.state) {
            content = (
                <TabForm onConfirm={this.handle_onTabCreate}/>
            );
        } else {
            content = (
                <List
                    backingCollection={this.state[this.state.state]}
                    filters={this.state.filters}
                    onConfirm={this.onItemDelete}
                    onInspect={this.onItemInspect}
                    onSelect={this.onItemSelect}/>
            );
        }
        return (
            <Aux>
                <Header
                    actions={{
                        deleteItem: this.handle_onItemDelete,
                        openFilter: this.handle_onFilterOpen
                    }}
                    selected={this.state.selected}
                    collection={this.state.decks}
                    onClick={this.onAsideClose}
                    onNavigation={this.onAsideToggle}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.onListOut}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        <TabBar
                            actions={this.state.tabs.actions}
                            backingCollection={this.state.tabs}/>
                        {content}
                        <ActionButton
                            onClick={this.onActionClick}
                            state={this.state.action.state}
                            values={['Create', 'Study']}/>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    active={this.state.aside.isActive}
                    data={this.state.aside.data}
                    onClose={this.onAsideClose}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        select_decks: select.decks(state),
        select_cards: select.cards(state),
        select_token: select.authToken(state),
        select_user: select.authUser(state),
        select_userId: select.userId(state),
        select_userTabs: select.userTabs(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        delete_async: (url, token, id) => dispatch(actions.delete_async(url, token, id)),
        deleteUserTab_async: (token, user, id) => dispatch(actions.deleteUserTab_async(token, user, id)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        patch_async: (url, token, data) => dispatch(actions.patch_async(url, token, data)),
        patchUserTab_async: (token, user, data) => dispatch(actions.patchUserTab_async(token, user, data)),
        put_async: (url, token, data) => dispatch(actions.put_async(url, token, data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);