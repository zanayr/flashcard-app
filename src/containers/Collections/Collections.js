import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as create from '../../store/models/models';
import * as utility from '../../utility/utility';
import * as sortTypes from '../../utility/sortTypes';


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
        sort: sortTypes.ALPHA_ASC,
        tabs: this.props.user.tabs,
        tags: this.props.user.tags,
        undo: {
            action: null,
            data: {}
        },
    }

    //  Quicks  ------------------------------------------------------------  Quicks //
    clearQuick (value) {
        this.setState(prev => ({
            ...prev,
            quick: prev.quick.filter(q => q !== value)
        }))
    }
    setQuick (value) {
        if (!this.state.quick.includes(value)) {
            this.setState(prev => ({
                ...prev,
                quick: prev.quick.concat(value)
            }));
        }
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    clearAside () {
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
    setAsideActions (actions) {
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
        if (this.state.aside.state) {
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
                        isActive: 0
                    }
                }));
            }
        } else {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    state: state
                }
            }));
        }
    }
 
    //  Undo  --------------------------------------------------------------  Undo  //
    clearUndo () {
        this.setState(prev => ({
            ...prev,
            undo: {
                action: null,
                data: {}
            }
        }));
    }
    setUndo (data) {
        this.setState(prev => ({
            ...prev,
            undo: {
                ...data
            }
        }));
    }

    //  Collections  -------------------------------------------------  Collections  //
    addItem (item) {
        this.setState(prev => ({
            ...prev,
            [item.type]: {
                ...prev[item.type],
                [item.id]: item
            }
        }));
    }
    setCollection (type, collection) {
        this.setState(prev => ({
            ...prev,
            [type]: collection
        }));
    }
    setItem (item) {
        this.setState(prev => ({
            ...prev,
            [item.type]: {
                ...prev[item.type],
                [item.id]: {...item}
            }
        }));
    }
    setItemValue (item, target, value) {
        this.setState(prev => ({
            ...prev,
            [item.type]: {
                ...prev[item.type],
                [item.id]: {
                    ...prev[item.type][item.id],
                    [target]: value
                }
            }
        }));
    }

    //  Lists  -------------------------------------------------------------  Lists  //
    clearSelected (item) {
        if (typeof item === 'undefined') {
            this.setState(prev => ({
                ...prev,
                selected: []
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                selected: [item]
            }));
        }
    }
    setSelected (selected) {
        this.setState(prev => ({
            ...prev,
            selected: selected
        }));
    }

    //  Filters  ---------------------------------------------------------  Filters  //
    clearFilters () {
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
            }
        }));
    }
    setFilters (category, filters) {
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
    }

    //  Tags  ---------------------------------------------------------------  Tags  //
    setTags (category, tags) {
        this.setState(prev => ({
            ...prev,
            [category]: tags
        }));
    }

    //  Tabs  ---------------------------------------------------------------  Tabs  //
    addTab (tab) {
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...prev.tabs,
                [tab.id]: tab
            }
        }));
    }
    setCurrentTab (tab) {
        this.setState(prev => ({
            ...prev,
            current: tab
        }));
    }
    setTabs (tabs) {
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
    }

    //  Sort  ---------------------------------------------------------------  Sort  //
    setSort (sort) {
        this.setState(prev => ({
            ...prev,
            sort: sort
        }));
    }

    //  Action  -----------------------------------------------------------  Action  //
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
        this.addItem(item);
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
                        this.setQuick('u');
                    }
                    break;
                default:
                    break;
            }
            this.clearAside();
        }
    }
    handle_onFilterClear = () => {
        this.clearFilters();
        this.clearQuick('f');
    }
    handle_onFilterSelect = (category, tag) => {
        const filters = {...this.state.filters};
        if (filters[category].includes(tag)) {
            filters[category] = filters[category].filter(t => t !== tag);
        } else {
            filters[category] = filters[category].concat(tag);
        }
        this.setFilters(category, filters);
        if (filters.tags.length || filters.groups.length) {
            this.setQuick('f');
        } else {
            this.clearQuick('f');
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
                    this.setAsideActions({
                        onSelect: this.handle_onFilterSelect
                    });
                    break;
                case 3:
                    this.setAsideData({
                        category: 'groups',
                        selected: this.state.filters.groups,
                        tags: this.state.groups.slice()
                    });
                    this.setAsideActions({
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
            this.setTags(category, allTags);
            this.props.putTag_async(category, this.props.token, this.props.user.id, allTags);
        }
    }

    handle_onItemChange = (item, payload) => {
        this.setItemValue(item, payload.target, payload.value);
    }
    handle_onItemReset = () => {
        const undo = {
            action: this.state.undo.action,
            data: this.state.undo.data
        }
        this.setItem(undo.data);
        this.clearUndo();
        this.clearQuick('u');
        this.props.putItem_async(this.props.token, undo.data);
    }
    handle_onItemInspect = (item) => {
        this.toggleAside(99);
        this.setAsideData({
            groups: this.state.groups,
            item: item,
            tags: this.state.tags
        });
        this.setAsideActions({
            onChange: this.handle_onItemChange
        });
        this.setUndo({
            action: this.handle_onItemReset,
            data: item
        });
    }
    handle_onItemSelectClear = (item) => {
        this.clearSelected(item);
        this.clearQuick('s');
    }
    handle_onItemSelect = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        this.setSelected(selected);
        if (selected.length) {
            this.setQuick('s');
        } else {
            this.clearQuick('s');
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
        
        
        this.setFilters('groups', tab);
        this.setFilters('tags', tab);
        this.setCurrentTab(id);
        this.addTab(newTab);
        // this.setState(prev => ({
        //     ...prev,
        //     current: id,
        //     filters: {
        //         groups: tab.groups,
        //         tags: tab.tags
        //     },
        //     tabs: {
        //         ...prev.tabs,
        //         [id]: newTab
        //     }
        // }));
        this.props.patchTab_async(this.props.token, this.props.user.id, newTab);
    }

    //  Add Tab  //
    handle_onTabAdd = () => {
        this.setCurrentTab('add');
    }

    //  Remove Tab  //
    handle_onTabRemove = (tab) => {
        let tabs = this.state.tabs;
        delete tabs[tab];
        this.setTabs(tabs);
        this.props.deleteTab_async(this.props.token, this.props.user.id, tab);
    }

    //  Tab Toggle  //
    handle_onTabToggle = (tab) => {
        this.setCurrentTab(tab);
        this.setFilters('groups', this.state.tabs[tab]);
        this.setFilters('tags', this.state.tabs[tab]);
        this.clearSelected();
        this.clearQuick('s');
    }

    handle_onTabBarClick = () => {
        //  Do something...
    }
    // handle_onItemRecover = () => {
    //     const item = this.state.undo.data;
    //     this.setState(prev => ({
    //         ...prev,
    //         [item.type]: {
    //             ...prev[item.type],
    //             [item.id]: item
    //         },
    //         quick: prev.quick.filter(q => q.value !== 'u'),
    //         undo: {
    //             ...prev.undo,
    //             action: null,
    //             data: {}
    //         }
    //     }));
    //     this.props.patchItem_async(this.props.token, item);
    // }
    handle_onItemDelete = (item) => {
        const collection = {...this.state[item.type]};
        delete collection[item.id];
        this.setCollection(item.type, collection);
        // this.setUndo({
        //     action: this.handle_onItemRecover,
        //     data: item
        // });
        // if (!this.state.quick.find(q => q.value === 'u')) {
        //     this.setState(prev => ({
        //         ...prev,
        //         quick: prev.quick.concat({
        //             action: this.state.undo.action,
        //             value: 'u'
        //         })
        //     }));
        // }
        this.props.deleteItem_async(this.props.token, item);
    }
    handle_onBulkDelete = () => {
        const type = this.state.tabs[this.state.current].collection;
        const collection = {...this.state[this.state.tabs[this.state.current].collection]};
        const selected = this.state.selected.slice();
        selected.forEach(item => {
            delete collection[item.id];
        });
        this.setCollection(type, collection);
        this.clearSelected();
        this.clearQuick('s');
        this.props.deleteManyItems_async(this.props.token, selected);
    }
    handle_onDeckMerge = () => {
        //  This is all temporary  //
        const tags = [];
        const groups = [];
        const id = utility.createHashId(0);
        let item;
        //  Get all tags and groups
        this.state.selected.map(item => {
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
        //  Create merged deck
        item = create.itemViewModel(id, {
            date: Date.now(),
            groups: groups,
            meta: {},
            notes: 'These are notes for this flashcard deck.',
            owner: this.props.user.id,
            primary: id + ' New Merged Flashcard Deck',
            secondary: 'This flashcard decks was merged from...',
            tags: tags,
            type: 'deck',
        });
        //  Send to redux and db
        this.props.patchItem_async(this.props.token, item);
        //  Update local state
        this.setItem(item);
        this.clearSelected(item);
        this.clearQuick('s');
    }
    handle_onItemClone = () => {
        const items = {};
        this.state.selected.map((item, i) => {
           let id = utility.createHashId(i);
           let clone = create.itemViewModel(id, {
               ...item,
               primary: 'Clone of ' + item.primary
           });
           items[id] = clone;
        });

        this.props.patchManyItems_async(this.props.token, Object.keys(items).map(key => {
            return items[key];
        }));

        this.setState(prev => ({
            ...prev,
            [this.state.tabs[this.state.current].collection]: {
                ...prev[this.state.tabs[this.state.current].collection],
                ...items
            }
        }));
        this.clearSelected();
        this.clearQuick('s');
    }

    handle_onSortChange = (sort) => {
        this.setSort(sort);
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let mainContent = null;
        if (this.state.tabs[this.state.current]) {
            let tab = this.state.tabs[this.state.current];
            mainContent = (
                <List
                    backingCollection={utility.sortBy(this.state.sort, this.state[tab.collection])}
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
                        onDelete: this.handle_onBulkDelete,
                        onMerge: this.handle_onDeckMerge,
                        onClone: this.handle_onItemClone,
                        onSortChange: this.handle_onSortChange,
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
                        <QuickBar
                            actions={{
                                onUndo: this.state.undo.action,
                                onFilterClear: this.handle_onFilterClear,
                                onSelectClear: this.handle_onItemSelectClear
                            }}
                            data={this.state.quick}/>
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
        deleteManyItems_async: (token, items) => dispatch(actions.deleteManyItems_async(token, items)),
        deleteTab_async: (token, user, id) => dispatch(actions.deleteTab_async(token, user, id)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        patchItem_async: (token, item) => dispatch(actions.patchItem_async(token, item)),
        patchManyItems_async: (token, items) => dispatch(actions.patchManyItems_async(token, items)),
        putTag_async: (url, token, user, data) => dispatch(actions.putTag_async(url, token, user, data)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data)),
        putItem_async: (token, item) => dispatch(actions.putItem_async(token, item)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Collections));