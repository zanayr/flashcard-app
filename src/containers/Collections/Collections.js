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
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/tab/TabBar/TabBar';
import TabForm from '../../components/form/Tab/TabForm';

import AppCSS from '../../App.module.css';
import CollectionsCSS from './Collections.module.css';

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
        quick: [],
        selected: [],
        tabs: this.props.user.tabs,
        tags: this.props.user.tags,
        undo: {
            action: null,
            data: {}
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
 

    setUndo (data) {
        this.setState(prev => ({
            ...prev,
            undo: {
                ...data
            }
        }));
    }

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
        this.setState(prev => ({
            ...prev,
            [item.type]: {
                ...prev[item.type],
                [item.id]: item
            }
        }));
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
                            quick: prev.quick.concat({
                                action: this.state.undo.action,
                                value: '↺'
                            })
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
    handle_onFilterClear = () => {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...prev.aside.data,
                    selected: []
                }
            },
            filters: {
                groups: [],
                tags: []
            },
            quick: prev.quick.filter(q => q.value !== '✕')
        }));
    }
    handle_onFilterSelect = (category, tag) => {
        const filters = {...this.state.filters};
        if (filters[category].includes(tag)) {
            filters[category] = filters[category].filter(t => t !== tag);
        } else {
            filters[category] = filters[category].concat(tag);
        }
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...prev.aside.data,
                    selected: filters[category]
                }
            },
            filters: {
                ...prev.filters,
                [category]: filters[category]
            }
        }));
        if (filters.tags.length || filters.groups.length) {
            if (!this.state.quick.find(q => q.value === '✕')) {
                this.setState(prev => ({
                    quick: prev.quick.concat({
                        action: this.handle_onFilterClear,
                        value: '✕'
                    })
                }));
            }
        } else {
            this.setState(prev => ({
                quick: prev.quick.filter(q => q.value !== '✕')
            }));
        }
    }

    handle_onAsideToggle = (state) => {
        if (this.state.aside.state !== state) {
            switch (state) {
                case 2:
                    this.setAsideData({
                        category: 'tags',
                        selected: this.state.filters.tags,
                        tags: this.state.tags.slice()
                    });
                    this.setAsideAction({
                        onSelect: this.handle_onFilterSelect
                    });
                    break;
                case 3:
                    this.setAsideData({
                        category: 'groups',
                        selected: this.state.filters.groups,
                        tags: this.state.groups.slice()
                    });
                    this.setAsideAction({
                        onSelect: this.handle_onFilterSelect
                    });
                    break;
                default:
                    break;
            }
            this.toggleAside(state);
        } else {
            this.handle_onAsideClose();
        }
    }

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
            quick: prev.quick.filter(q => q.value !== '↺'),
            undo: {
                ...prev.undo,
                action: null,
                data: {}
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
        this.setAsideAction({
            onChange: this.handle_onItemChange
        });
        this.setUndo({
            action: this.handle_onItemReset,
            data: item
        });
    }
    handle_onItemSelectClear = () => {
        this.setState(prev => ({
            ...prev,
            quick: prev.quick.filter(q => q.value !== '⚬'),
            selected: []
        }));
    }
    handle_onItemSelect = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        this.setState(prev => ({
            ...prev,
            selected: selected
        }));
        if (selected.length) {
            if (!this.state.quick.find(q => q.value === '⚬')) {
                this.setState(prev => ({
                    quick: prev.quick.concat({
                        action: this.handle_onItemSelectClear,
                        value: '⚬'
                    })
                }));
            }
        } else {
            this.setState(prev => ({
                quick: prev.quick.filter(q => q.value !== '⚬')
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


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let mainContent = null;
        if (this.state.tabs[this.state.current]) {
            let tab = this.state.tabs[this.state.current];
            mainContent = (
                <List
                    backingCollection={utility.sortCollectionByDateAsc(this.state[tab.collection])}
                    filters={this.state.filters}
                    selected={this.state.selected}
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
                        <QuickBar data={this.state.quick}/>
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