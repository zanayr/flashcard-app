import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as create from '../../store/models/models';
import * as utility from '../../utility';


import withUser from '../../hoc/withUser/withUser';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import TabBar from '../../components/ui/tab/TabBar/TabBar';
import TabForm from '../../components/form/Tab/TabForm';

import AppCSS from '../../App.module.css';
import CollectionsCSS from './Collections.module.css';
import QuickButton from '../../components/ui/button/Quick/QuickButton';

class Collections extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: 0
        },
        deck: this.props.select_decks,
        card: this.props.select_cards,
        current: 'deck',
        filters: {
            groups: [],
            tags: []
        },
        groups: this.props.user.groups,
        selected: [],
        tabs: this.props.user.tabs,
        tags: this.props.user.tags,
        undo: {
            action: null,
            data: {},
            state: 0
        },
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
    toggleAside (state) {
        if (this.state.aside.isActive) {
            if (state !== this.state.aside.state && this.state.aside.isActive) {
                this.setState(prev => ({
                    ...prev,
                    aside: {
                        ...prev.aside,
                        state: state
                    }
                }));
            } else {
                this.setState(prev => ({
                    ...prev,
                    aside: {
                        ...prev.aside,
                        isActive: false
                    }
                }));
            }
        } else {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    isActive: true,
                    state: state
                }
            }));
        }
    }

    //  List  ---------------------------------------------------------------  List  //
    addSelectedID (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(id)
        }));
    }
    removeSelectedID (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.filter(i => i !== id)
        }));
    }

    //  Closes any open confrim context action button
    closeConfirmCA () {
        this.setState(prev => ({
            ...prev,
            confirm: false
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
            [item.type]: {
                ...prev[item.type],
                [item.id]: item
            }
        }));
    }
    removeItem (item) {
        
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
 

    setUndo (data) {
        this.setState(prev => ({
            ...prev,
            undo: {
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
    handle_onActionClick = () => {
        //  This is all temporary  //
        let id = utility.createHashId(0);
        let item;
        if (this.state.tabs[this.state.current].collection === 'deck') {
            item = {
                date: Date.now(),
                groups: [...this.state.filters.groups],
                meta: {},
                notes: 'These are notes for this flashcard deck.',
                owner: this.props.user.id,
                primary: id + ' Flashcard Deck',
                secondary: 'These are details for this flashcard deck.',
                tags: [...this.state.filters.tags],
                type: 'deck',
            }
        } else {
            item = {
                date: Date.now(),
                groups: [...this.state.filters.groups],
                meta: {},
                notes: 'These are notes for this flashcard',
                owner: this.props.user.id,
                primary: id + ' Flashcard Front',
                secondary: 'Flashcard Back',
                tags: [...this.state.filters.tags],
                type: 'card',
            }
        }
        item = create.itemViewModel(id, item);
        this.createItem(item);
        this.props.patchItem_async(this.props.token, item);
    }



    //  Aside  -------------------------------------------------------------  Aside  //
    handle_onAsideClose = () => {
        const aside = {
            actions: this.state.aside.actions,
            data: this.state.aside.data
        }
        if (this.state.aside.state) {
            switch (this.state.aside.state) {
                case 99:
                    const item = this.state[aside.data.item.type][aside.data.item.id];
                    if (JSON.stringify(item) !== JSON.stringify(aside.data.item)) {
                        this.checkForNewTags('tags', this.state[item.type][item.id].tags);
                        this.checkForNewTags('groups', this.state[item.type][item.id].groups);
                        this.props.putItem_async(this.props.token, item);
                        this.setState(prev => ({
                            ...prev,
                            undo: {
                                ...prev.undo,
                                state: 1
                            }
                        }));
                    }
                    break;
                default:
                    break;
            }
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    actions: {},
                    data: {},
                    state: 0
                }
            }));
        }
    }
    handle_onAsideToggle = state => {
        this.toggleAside(state);
    }

    //  List  ---------------------------------------------------------------  List  //

    //  Check for new user tags and groups
    checkForNewTags (category, tags) {
        const newTags = tags.filter(tag => this.state[category].indexOf(tag) < 0);
        let allTags;
        if (newTags.length) {
            allTags = this.state[category].concat(newTags);
            this.setState(prev => ({
                ...prev,
                [category]: allTags
            }));
            this.props.putTag_async(category, this.props.token, this.props.user.id, allTags);
        }
    }

    handle_onItemChange = (item, payload) => {
        this.setState(prev => ({
            ...prev,
            [item.type]: {
                ...prev[item.type],
                [item.id]: {
                    ...prev[item.type][item.id],
                    [payload.target]: payload.value
                }
            }
        }));
    }
    handle_onItemReset = () => {
        const undo = {
            action: this.state.undo.action,
            data: this.state.undo.data
        }
        this.setState(prev => ({
            ...prev,
            [undo.data.type]: {
                ...prev[undo.data.type],
                [undo.data.id]: {...undo.data}
            },
            undo: {
                ...prev.undo,
                action: null,
                data: {},
                state: 0
            }
        }));
        this.props.putItem_async(this.props.token, undo.data);
    }
    handle_onItemInspect = (item) => {
        this.toggleAside(99);
        this.setAsideData({
            groups: this.state.groups,
            item: item,
            tags: this.state.tags
        });
        this.setUndo({
            action: this.handle_onItemReset,
            data: item
        });
        this.setAsideAction({
            onChange: this.handle_onItemChange
        });
    }
    
    handle_onItemSelect = (item) => {
        if (this.state.selected.find(i => i.id == item.id)) {
            this.setState(prev => ({
                ...prev,
                selected: prev.selected.filter(i => i.id !== item.id)
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                selected: prev.selected.concat(item)
            }));
        }
        if (this.state.aside.state === 99) {
            this.handle_onAsideClose();
        }
    }


    //  TABS  ---------------------------------------------------------------  TABS  //
    //  Create Tab  //
    handle_onTabCreate = (tab) => {
        const id = utility.createHashId(0);
        const newTab = create.tabViewModel(id, {
            ...tab,
            date: Date.now()
        });

        this.checkForNewTags('tags', tab.tags);
        this.checkForNewTags('groups', tab.groups);
        

        this.setState(prev => ({
            ...prev,
            current: id,
            filters: {
                groups: tab.groups,
                tags: tab.tags
            },
            tabs: {
                ...prev.tabs,
                [id]: newTab
            }
        }));
        console.log(newTab);
        this.props.patchTab_async(this.props.token, this.props.user.id, newTab);
    }

    //  Add Tab  //
    handle_onTabAdd = () => {
        this.setState(prev => ({
            ...prev,
            current: 'add'
        }));
    }

    //  Remove Tab  //
    handle_onTabRemove = (tab) => {
        let tabs = this.state.tabs;
        delete tabs[tab];
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
        this.props.deleteTab_async(this.props.token, this.props.user.id, tab);
    }

    //  Tab Toggle  //
    handle_onTabToggle = (tab) => {
        this.setState(prev => ({
            ...prev,
            current: tab,
            filters: {
                groups: this.state.tabs[tab].groups,
                tags: this.state.tabs[tab].tags
            }
        }));
    }

    handle_onTabBarClick = () => {
        //  Do something...
    }

    handle_onItemDelete = (item) => {
        const collection = {...this.state[item.type]};
        delete collection[item.id];
        this.setState(prev => ({
            ...prev,
            [item.type]: collection
        }));
        this.props.deleteItem_async(this.props.token, item);
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
        this.setAsideData({
            filters: this.state.user[category],
            category: category
        });
        this.setAsideAction({
            onToggle: this.toggleFilter,
        });
        if (category === 'tags') {
            this.toggleAside(2);
        } else {
            this.toggleAside(3);
        }
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let mainContent = null;
        if (this.state.tabs[this.state.current]) {
            let tab = this.state.tabs[this.state.current];
            mainContent = (
                <List
                    backingCollection={utility.sortCollectionByDateAsc(this.state[tab.collection])}
                    filters={this.state.filters}
                    onConfirm={this.handle_onItemDelete}
                    onInspect={this.handle_onItemInspect}
                    onSelect={this.handle_onItemSelect}/>
            );
        } else {
            mainContent = (
                <TabForm
                    tags={this.state.tags}
                    groups={this.state.groups}
                    onConfirm={this.handle_onTabCreate}/>
            );
        }
        return (
            <Aux>
                <Header
                    actions={{
                        deleteItem: this.handle_onItemDelete,
                        openFilter: this.handle_onFilterOpen,
                        toggleAside: this.handle_onAsideToggle,
                        closeAside: this.handle_onAsideClose
                    }}
                    collection={this.state[this.state.state]}
                    selected={this.state.selected}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.handle_onAsideClose}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        <TabBar
                            actions={{
                                onCreate: this.handle_onTabAdd,
                                onClick: this.handle_onTabBarClick,
                                onRemove: this.handle_onTabRemove,
                                onToggle: this.handle_onTabToggle,
                            }}
                            backingCollection={this.state.tabs}
                            current={this.state.current}/>
                        {mainContent}
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={0}
                            values={['Create', 'Study']}/>
                        <QuickButton
                            state={this.state.undo.state}
                            onClick={this.handle_onItemReset}>
                            &#8619;
                            </QuickButton>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    data={this.state.aside.data}
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
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem_async: (token, item) => dispatch(actions.deleteItem_async(token, item)),
        deleteTab_async: (token, user, id) => dispatch(actions.deleteTab_async(token, user, id)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        patchItem_async: (token, item) => dispatch(actions.patchItem_async(token, item)),
        putTag_async: (url, token, user, data) => dispatch(actions.putTag_async(url, token, user, data)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data)),
        putItem_async: (token, item) => dispatch(actions.putItem_async(token, item)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Collections));