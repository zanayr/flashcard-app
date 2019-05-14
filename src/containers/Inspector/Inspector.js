import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';


import Throbber from '../../components/ui/Throbber/Throbber';
import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List2 from '../../components/List/List2';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import withUser from '../../hoc/withUser/withUser';

import styles from './Inspector.module.css';

class Inspector extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: asideTypes.CLOSED
        },
        current: {
            group: [],
            tag: []
        },
        collection: {},
        deck: {},
        filters: {
            group: [],
            tag: []
        },
        group: this.props.user.group,
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: {},
        tag: this.props.user.tag,
        undo: {
            action: null,
            data: {}
        },
    }

    componentDidMount () {
        const cards = this.props.select_cards;
        const deck = this.props.select_deck;
        const collection = {}
        const tabs = deck.tab;
        Object.keys(cards).filter(id => deck.member.includes(id)).map(id => {
            if (deck.member.includes(id)) {
                collection[id] = cards[id];
            }
        });
        if (Object.keys(tabs).length) {
            tabs['default'] = {
                active: true,
                date: 1,
                group: [],
                id: 'default',
                name: 'All',
                tag: []
            };
        }
        this.setState(prev => ({
            ...prev,
            collection: collection,
            deck: deck,
            tab: tabs
        }), () => {
            this.setState(prev => ({
                ...prev,
                main: 'LIST_VIEW'
            }));
        });
    }




    //  Quicks  ------------------------------------------------------------  Quicks //
    _clearQuick (value) {
        this.setState(prev => ({
            ...prev,
            quick: prev.quick.filter(q => q !== value)
        }))
    }
    _setQuick (value) {
        if (!this.state.quick.includes(value)) {
            this.setState(prev => ({
                ...prev,
                quick: prev.quick.concat(value)
            }));
        }
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    _clearAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {},
                data: {}
            }
        }));
    }
    _closeAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: asideTypes.CLOSED
            }
        }));
    }
    _openAside (state) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: state
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
    _updateAsideData (property, data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...prev.aside.data,
                    [property]: data
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
        if (this.state.aside.state !== asideTypes.CLOSED) {
            if (state !== this.state.aside.state) {
                this._openAside(state);
            } else {
                this._closeAside();
            }
        } else {
            this._openAside(state);
        }
    }
    //  Main  //
    _toggleMainState (state) {
        this.setState(prev => ({
            ...prev,
            main: state
        }));
    }
    //  Undo  --------------------------------------------------------------  Undo  //
    _clearUndo () {
        this.setState(prev => ({
            ...prev,
            undo: {
                action: null,
                data: {}
            }
        }));
    }
    _setUndo (data) {
        this.setState(prev => ({
            ...prev,
            undo: {
                ...data
            }
        }));
    }

    //  Inspector  -------------------------------------------------  Inspector  //
    addCard (card) {
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [card.id]: card
            }
        }));
    }
    resetCollection (collection) {
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }
    _setItem (item) {
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [item.id]: {...item}
            }
        }));
    }
    setManyItems (items) {
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                ...items
            }
        }));
    }
    setItemValue (target, value) {
        const itemId = this.state.aside.data.item.id;
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [itemId]: {
                    ...prev.collection[itemId],
                    [target]: value
                }
            }
        }));
    }

    //  Lists  -------------------------------------------------------------  Lists  //
    _clearSelected () {
        this.setState(prev => ({
            ...prev,
            selected: []
        }));
    }
    setSelected (selected) {
        this.setState(prev => ({
            ...prev,
            selected: selected
        }));
    }

    //  Filters  ---------------------------------------------------------  Filters  //
    _setCurrent (tab) {
        console.log(tab);
        this.setState(prev => ({
            current: {
                group: tab.group.slice(),
                tag: tab.tag.slice()
            }
        }));
    }
    // clearFilters () {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 selected: []
    //             }
    //         },
    //         filters: {
    //             groups: [],
    //             tags: []
    //         }
    //     }));
    // }
    // setFilters (category, filters) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 selected: filters[category]
    //             }
    //         },
    //         filters: {
    //             ...prev.filters,
    //             [category]: filters[category]
    //         }
    //     }));
    // }

    //  Tags  ---------------------------------------------------------------  Tags  //

    //  Tabs  ---------------------------------------------------------------  Tabs  //
    _addTab (tab) {
        this.setState(prev => ({
            ...prev,
            tab: {
                ...prev.tab,
                [tab.id]: tab
            }
        }));
    }
    _closeAllTabs () {
        const tabs = {};
        Object.keys(this.state.tab).forEach(id => {
            this.state.tab[id].active = false;
            tabs[id] = {...this.state.tab[id]};
        });
        this.setState(prev => ({
            ...prev,
            tab: tabs
        }));
    }
    _closeAllTabsBut (tab) {
        const tabs = {};
        console.log(this.state.tab, tab.id);
        Object.keys(this.state.tab).forEach(id => {
            if (id === tab.id) {
                this.state.tab[id].active = true;
            } else {
                this.state.tab[id].active = false;
            }
            tabs[id] = {...this.state.tab[id]};
        });
        this.setState(prev => ({
            ...prev,
            tab: tabs
        }));
    }
    _removeDefualtTab () {
        if (Object.keys(this.state.tab).length === 2) {
            const tabs = this.state.tab;
            delete tabs['default'];
            return tabs;
        }
        return this.state.tab;
    }
    _resetTabs (tabs) {
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
    }

    //  Sort  ---------------------------------------------------------------  Sort  //
    // setSort (sort) {
    //     this.setState(prev => ({
    //         ...prev,
    //         sort: sort
    //     }));
    // }

    //  Action  -----------------------------------------------------------  Action  //
    _addMember (item) {
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                member: prev.deck.member.concat(item.id)
            }
        }));
    }
    _addManyMembers (items) {
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                member: prev.deck.member.concat(items.map(item => {return item.id}))
            }
        }));
    }
    _addItem (item) {
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [item.id]: item
            }
        }));
    }
    _addManyItems (items) {
        const collection = this.state.collection;
        items.forEach(item => {
            collection[item.id] = item;
        });
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }
    _addTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    handle_onTagCreate = (category, tag) => {
        console.log(category, tag);
        this._addTag(category, tag);
    }
    
    handle_onActionClick = () => {
        const card = create.cardViewModel(utility.createHashId(0), {
            member: [this.state.deck.id],
            owner: this.props.select_user.id,
            primary: '',
            secondary: ''
        });
        this._addItem(card);
        this.toggleAside(asideTypes.CREATE_CARD);
        this.setAsideData({
            group: this.state.group,
            item: card,
            deckId: this.state.deck.id,
            tag: this.state.tag
        });
        this.setAsideActions({
            cancel: this.handle_onAsideCancel,
            change: this.handle_onItemChange,
            confirm: () => this.handle_onItemCreate(this.state.collection[card.id]),
            create: this.handle_onTagCreate
        });
        this._clearSelected();
        this._clearQuick('s');
    }


    //  Aside  -------------------------------------------------------------  Aside  //
    _addItem_async (item) {
        this.props.addCard_async(this.props.token, item);
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            member: this.state.deck.member.concat(item.id)
        });
    }
    _addManyItems_async (items) {
        this.props.addManyCards_async(this.props.token, items);
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            member: this.state.deck.member.concat(items.map(item => {
                return item.id;
            }))
        });
    }

    handle_onItemCreate = (item) => {
        this._addMember(item);
        this._addItem_async(item);
        this._clearAside();
        this._closeAside();
    }
    handle_onItemUpdate = () => {
        const original = this.state.aside.data.item;
        const item = this.state.collection[original.id];
        if (JSON.stringify(item) !== JSON.stringify(original)) {
            this.props.updateCard_async(this.props.token, item);
            this._setUndo({
                action: this.handle_onUndoUpdate,
                data: original
            });
            this._setQuick('u');
        }
        this._clearAside();
        this._closeAside();
    }

    _itemIsValid (item) {
        let valid = true;
        if (!item.primary.length > 0 && valid) {
            valid = false;
        }
        if (!item.secondary.length && valid) {
            valid = false
        }
        return valid;
    }
    handle_onAsideCancel = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_CARD:
                this._removeItem(this.state.collection[this.state.aside.data.item.id]);
                break;
            case asideTypes.INSPECT_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._itemIsValid(data)) {
                    this._setItem(originalData.item);
                }
                break;
            default:
                break;
        }
        this._clearAside();
        this._closeAside();
    }
    handle_onAsideClose = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._itemIsValid(data)) {
                    this.handle_onItemCreate(data);
                } else {
                    this._removeItem(data);
                }
                break;
            case asideTypes.INSPECT_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._itemIsValid(data)) {
                    this.props.updateCard_async(this.props.token, data);
                    this._setUndo({
                        action: this.handle_onUndoUpdate,
                        data: originalData.item
                    });
                    this._setQuick('u');
                }
                break;
            default:
                break;
        }
        this._clearAside();
        this._closeAside();
    }
    
    // handle_onFilterSelect = (category, tag) => {
    //     const filters = {...this.state.filters};
    //     if (filters[category].includes(tag)) {
    //         filters[category] = filters[category].filter(t => t !== tag);
    //     } else {
    //         filters[category] = filters[category].concat(tag);
    //     }
    //     this.setFilters(category, filters);
    //     this.updateAsideData('filters', filters);
    //     if (filters.tags.length || filters.groups.length) {
    //         this._setQuick('f');
    //     } else {
    //         this._clearQuick('f');
    //     }
    // }

    // handle_onAsideToggle = (state) => {
    //     if (this.state.aside.state !== state) {
    //         if (state === 2 || state === 3) {
    //             this.setAsideActions({
    //                 filter: this.handle_onFilterSelect
    //             });
    //             this.setAsideData({
    //                 current: this.state.current,
    //                 filters: this.state.filters,
    //                 groups: this.state.groups,
    //                 tags: this.state.tags
    //             });
    //         }
    //         this.toggleAside(state);
    //     } else {
    //         this.handle_onAsideClose();
    //     }
    // }

    handle_onItemChange = (target, value) => {
        this.setItemValue(target, value);
    }
    handle_onItemInspect = (item) => {
        this.toggleAside(asideTypes.INSPECT_CARD);
        this.setAsideData({
            groups: this.state.groups,
            item: item,
            deckId: this.state.deck.id,
            tags: this.state.tags
        });
        this.setAsideActions({
            cancel: this.handle_onAsideCancel,
            change: this.handle_onItemChange,
            confirm: this.handle_onItemUpdate,
            create: this.handle_onTagCreate
        });
        this._clearQuick('s');
    }
    handle_onItemSelect = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        if (selected.length) {
            this._setQuick('s');
        } else {
            this._clearQuick('s');
        }
        if (this.state.aside.state === asideTypes.CREATE_CARD || this.state.aside.state === asideTypes.INSPECT_CARD) {
            this.handle_onAsideClose();
        }
        this.setSelected(selected);
    }

    
    _findTheNextTab (tab) {
        const tabs = utility.sortBy(sortTypes.DATE_DSC, this.state.tab);
        return tabs[tabs.indexOf(tab) - 1];
    }


    //  EVENT HANDLERS  //
    //  Inspector  ---------------------------------------------  Inspector EHs  //
    // handle_onCollectionSort = (sort) => {
    //     this.setSort(sort);
    // }
    // handle_onItemsCreate = (items) => {
    //     const created = {};
    //     items.forEach(item => {
    //         created[item.id] = item;
    //     });
    //     this.setManyItems(created);
    //     this._clearSelected();
    //     this._clearQuick('s');
    // }
    // _resetDeckMembers (members) {
    //     this.setState(prev => ({
    //         ...prev,
    //         deck: {
    //             ...prev.deck,
    //             member: members
    //         }
    //     }));
    //     this.props.updateDeck_async(this.props.token, {
    //         ...this.state.deck,
    //         member: members
    //     });
    // }
    // _removeItemMember (item, member) {
    //     this.props.updateCard_async(this.props.select_token, {
    //         ...item,
    //         member: member
    //     });
    // }
    _removeItem (item) {
        const collection = this.state.collection;
        delete collection[item.id];
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                member: prev.deck.member.filter(id => id !== item.id)
            }
        }));
    }


    //  Delete Item  ------------------------------------------------------  Delete  //
    handle_onItemDelete = (item) => {
        this.props.deleteCard_async(this.props.select_token, item);
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => id !== item.id)
        });
        this._removeItem(item);
        this._setUndo({
            action: this.handle_onUndoDelete,
            data: [item]
        });
        this._setQuick('u');
        this._clearSelected();
    }
    //  Delete Many Items  -------------------------------------------  Delete Many  //
    // handle_onItemsDelete = () => {
    //     const collection = this.state.collection;
    //     const selected = this.state.selected.slice();
    //     const nonmembers = [];
    //     selected.forEach(item => {
    //         nonmembers.concat(item.id);
    //         delete collection[item.id];
    //         this.props.deleteCard_async(this.props.select_token, item);
    //     });
    //     this._removeDeckMembers(nonmembers);
    //     this._setUndo({
    //         action: this.handle_onItemsRecover,
    //         data: selected
    //     });
    //     this._setQuick('u');
    //     this.resetCollection(collection);
    //     this._clearQuick('s');
    //     this._clearSelected();
    // }

    //  Remove Item  -------------------------------------------------  Remove Item  //
    handle_onItemRemove = (item) => {
        this.props.updateCard_async(this.props.select_token, {
            ...item,
            member: item.member.filter(id => id !== this.state.deck.id)
        });
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => id !== item.id)
        });
        this._removeItem(item);
        this._setUndo({
            action: this.handle_onUndoRemove,
            data: [item]
        });
        this._clearSelected();
        this._clearQuick('s');
    }


    // handle_onItemsRecover = () => {
    //     const deleted = this.state.undo.data;
    //     const recovered = {}
    //     deleted.map(item => {
    //         recovered[item.id] = item
    //     });
    //     this.setManyItems(recovered);
    //     this._clearQuick('u');
    //     this._clearUndo();
    //     this.props.addManyCards_async(this.props.select_token, deleted);
    // }
    handle_onUndoUpdate = () => {
        const item = this.state.undo.data;
        this.props.updateCard_async(this.props.token, item);
        this._setItem(item);
        this._clearQuick('u');
        this._clearUndo();
    }
    handle_onUndoDelete = () => {
        const items = this.state.undo.data.slice();
        this._addManyItems(items);
        this._addManyMembers(items);
        this._addManyItems_async(items);
        this._clearQuick('u');
        this._clearUndo();
    }
    // handle_onItemReset = () => {
    //     const item = this.state.undo.data;
    //     this.setItem(item);
    //     this._clearQuick('u');
    //     this._clearUndo();
    //     this.props.addCard_async(this.props.select_token, item);
    // }
    
    // //  Filters  -----------------------------------------------------  Filters EHs  //
    // handle_onFilterClear = () => {
    //     this.clearFilters();
    //     this._clearQuick('f');
    //     this.updateAsideData('filters', {
    //         groups: [],
    //         tags:[]
    //     });
    // }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    handle_onMainClick = () => {
        this.handle_onAsideClose();
        this._clearSelected();
        this._clearQuick('s');
    }

    // //  Selected  ---------------------------------------------------  Selected EHs  //
    handle_onItemSelectClear = () => {
        this._clearSelected();
        this._clearQuick('s');
    }

    // //  Tab  -------------------------------------------------------------  Tab EHs  //
    handle_onTabAdd = () => {
        this._toggleMainState('ADD_TAB');
    }
    _removeCollectionTab_async (tab) {
        const tabs = {...this.state.tab};
        delete tabs['default'];  //  Remove the default tab from the tabs object
        delete tabs[tab.id];
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: tabs
        });
    }
    handle_onTabDelete = (tab) => {
        let tabs = this._removeDefualtTab();
        // if (tab.active) {
        //     this.handle_onTabToggle(this._findTheNextTab(tab));
        // }
        delete tabs[tab.id];
        this._removeCollectionTab_async(tab);
        this._resetTabs(tabs);
    }
    handle_onTabToggle = (tab) => {
        this._closeAllTabsBut(tab);
        // if (this.state.aside.state === asideTypes.FILTER_TAG || this.state.aside.state === asideTypes.FILTER_GROUP) {
        //     this._updateAsideData('tab', tab);
        // }
        this._setCurrent(tab);
        this._clearSelected();
        this._clearQuick('s');
    }
    // _removeDefualtTab () {
    //     if (Object.keys(this.state.tab).length === 2) {
    //         this._removeTab('default');
    //     }
    // }
    _addDefaultTab () {
        if (!Object.keys(this.state.tab).length) {
            this._addTab(create.tabViewModel('default', {
                date: 1,
                group: [],
                name: 'All',
                tag: []
            }));
        }
    }
    handle_onTabCreate = (tab) => {
        this._closeAllTabs();
        this._addDefaultTab();
        this._addTab(tab);
        this._setCurrent(tab);
        this._toggleMainState('LIST_VIEW');
        const tabs = this.state.tab;
        tabs[tab.id] = tab;

        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: tabs
        });
    }


    render () {
        console.log(this.state.tab);
        let content;
        switch (this.state.main) {
            case 'LIST_VIEW':
                content = (
                    <List2

                    actions={{
                        delete: this.handle_onItemDelete,
                        inspect: this.handle_onItemInspect,
                        remove: this.handle_onItemRemove,
                        select: this.handle_onItemSelect
                    }}
                    collection={utility.sortBy(this.state.sort, this.state.collection)}
                    filters={this.state.filters}
                    page={this.state.page}
                    selected={this.state.selected}
                    current={this.state.current}/>
                );
                break;
            case 'ADD_TAB':
                content = (
                    <TabForm
                    tag={this.state.tag}
                    group={this.state.group}
                    onConfirm={this.handle_onTabCreate}/>
                );
                break;
            default:
                content = (<Throbber/>);
                break;
        }
        return (
            <Aux>
                <Header
                    actions={{
                        create: this.handle_onItemsCreate,
                        delete: this.handle_onItemsDelete,
                        sort: this.handle_onCollectionSort,
                        toggle: this.handle_onAsideToggle
                    }}
                    page={this.state.page}
                    selected={this.state.selected}
                    onClick={this.handle_onAsideClose}/>
                <main
                    className={styles.Main}
                    onClick={this.handle_onMainClick}>
                    <div>
                        <TabBar
                            actions={{
                                add: this.handle_onTabAdd,
                                delete: this.handle_onTabDelete,
                                toggle: this.handle_onTabToggle,
                            }}
                            collection={this.state.tab}
                            onClick={this.handle_onAsideClose}/>
                        {content}
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
                    page={this.state.page}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_deck: select.deck(state, ownProps.match.params.id),
        select_cards: select.cards(state),
        select_token: select.authToken(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCard_async: (token, item) => dispatch(actions.addCard_async(token, item)),
        addManyCards_async: (token, items) => dispatch(actions.addManyCards_async(token, items)),
        deleteCard_async: (token, item) => dispatch(actions.deleteCard_async(token, item)),
        updateCard_async: (token, item) => dispatch(actions.updateCard_async(token, item)),
        updateDeck_async: (token, deck) => dispatch(actions.updateDeck_async(token, deck)),
        updateDeckMember_async: (token, deck, members) => dispatch(actions.updateDeckMember_async(token, deck, members)),
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Inspector));