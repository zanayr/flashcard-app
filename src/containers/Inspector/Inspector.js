import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types';
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
            id: 'all',
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

    componentDidUpdate (prevProps, prevState) {
        //console.log(prevProps, this.props);
    }

    componentDidMount () {
        const cards = this.props.select_cards;
        const deck = this.props.select_deck;
        const collection = {}
        Object.keys(cards).filter(id => deck.member.includes(id)).map(id => {
            if (deck.member.includes(id)) {
                collection[id] = cards[id];
            }
        });
        this.setState(prev => ({
            ...prev,
            collection: collection,
            deck: deck,
            main: 'LIST_VIEW',
            tab: deck.tab
        }));
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
        const members = Object.keys(collection).map(id => {return id});
        this.setState(prev => ({
            ...prev,
            collection: collection,
            deck: {
                ...prev.deck,
                member: members
            }
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
    _setFilter (category, filter) {
        this.setState(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                [category]: filter
            }
        }));
    }

    //  Tags  ---------------------------------------------------------------  Tags  //

    //  Tabs  ---------------------------------------------------------------  Tabs  //
    _addTab (tab) {
        const tabs = {...this.state.tab};
        tabs[tab.id] = tab;
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                tab: tabs
            },
            tab: tabs
        }));
    }
    _resetTab (tabs) {
        this.setState(prev => ({
            ...prev,
            tab: tabs
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
        this._addTag(category, tag);
    }
    
    handle_onActionClick = () => {
        const card = create.cardViewModel(utility.createHashId(0), {
            member: [this.state.deck.id],
            owner: this.props.select_user.id,
            primary: '',
            secondary: '',
            tag: []
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
    
    handle_onFilterToggle = (category, tag) => {
        let filter = this.state.filters[category].slice();
        if (filter.includes(tag)) {
            filter = filter.filter(t => t !== tag);
        } else {
            filter = filter.concat(tag);
        }
        this._setFilter(category, filter);
        this._updateAsideData('filter', filter);
        if (filter.length) {
            this._setQuick('f');
        } else {
            this._clearQuick('f');
        }
    }

    handle_onFilterAside (category) {
        this.setAsideActions({
            toggle: (tag) => this.handle_onFilterToggle(category, tag)
        });
        this.setAsideData({
            all: this.state[category],
            filter: this.state.filters[category],
            tab: this.state.current[category]
        });
    }

    handle_onAsideToggle = (state) => {
        if (this.state.aside.state !== state) {
            switch (state) {
                case asideTypes.FILTER_GROUP:
                    this.handle_onFilterAside('group');
                    break;
                case asideTypes.FILTER_TAG:
                    this.handle_onFilterAside('tag');
                    break;
                default:
                    break;
            }
            this.toggleAside(state);
        } else {
            this.handle_onAsideClose();
        }
    }

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

    
    _findTheNextTab (tab, tabs) {
        const t = utility.sortBy(sortTypes.DATE_DSC, tabs);
        return t[t.indexOf(tab) - 1];
    }


    //  EVENT HANDLERS  //
    //  Inspector  ---------------------------------------------  Inspector EHs  //
    handle_onCollectionSort = (sort) => {
        this.setSort(sort);
    }
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
    _removeDeckMembers (nonmembers) {

    }
    //  Delete Many Items  -------------------------------------------  Delete Many  //
    handle_onManyItemsClone = () => {
        const cloned = [];
        const selected = this.state.selected.slice();
        selected.forEach((item, i) => {
            let primary;
            if (item.primary.length <= 24) {
                primary = 'Copy of ' + item.primary;
            } else {
                primary = 'Copy of ' + item.primary.substr(0, 21) + '...';
            }
            cloned.push(create.cardViewModel(utility.createHashId(i), {
                ...item,
                date: Date.now(),
                primary: primary
            }));
        });
        this._addManyItems(cloned);
        this._addManyMembers(cloned);
        this._addManyItems_async(cloned);
        this._clearSelected();
        this._clearQuick('s');
    }
    handle_onManyItemsDelete = () => {
        const collection = this.state.collection;
        const selected = this.state.selected.slice();
        const nonmembers = [];
        selected.forEach(item => {
            nonmembers.push(item.id);
            delete collection[item.id];
            this.props.deleteCard_async(this.props.select_token, item);
        });
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => !nonmembers.includes(id))
        });
        this.resetCollection(collection);

        this._setUndo({
            action: this.handle_onUndoDelete,
            data: selected
        });
        this._clearSelected();
        this._setQuick('u');
        this._clearQuick('s');
        
    }

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
    
    // //  Filters  -----------------------------------------------------  Filters EHs  //
    handle_onFilterClear = () => {
        this._setFilter('group', []);
        this._setFilter('tag', []);
        this._updateAsideData('filter', []);
        this._clearQuick('f');
        this.handle_onAsideClose();
    }

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
    handle_onTabDelete = (tab) => {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: tabs
        });
        this._resetTab(tabs);
        if (this.state.current.id === tab.id) {
            this._setCurrent({
                group: [],
                id: 'all',
                tag: []
            });
        }
    }
    _setCurrent (tab) {
        this.setState(prev => ({
            ...prev,
            current: {...tab},
            filters: {
                group: tab.group.slice(),
                tag: tab.tag.slice()
            }
        }));
    }
    handle_onTabToggle = (tab) => {
        this._setCurrent(tab);
        this._clearSelected();
        this._clearQuick('s');
        if (this.state.main === 'ADD_TAB') {
            this._toggleMainState('LIST_VIEW');
        }
    }
    handle_onTabCreate = (tab) => {
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: {
                ...this.state.deck.tab,
                [tab.id]: tab
            }
        });
        this._addTab(tab);
        this._setCurrent(tab);
        if (this.state.aside.state === asideTypes.FILTER_GROUP) {
            this.handle_onFilterAside('group', tab);
        } else if (this.state.aside.state === asideTypes.FILTER_TAG) {
            this.handle_onFilterAside('tag', tab);
        }
        this._toggleMainState('LIST_VIEW');
    }


    render () {
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
                    current={this.state.current}
                    selected={this.state.selected}/>
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
                        clone: this.handle_onManyItemsClone,
                        delete: this.handle_onManyItemsDelete,
                        sort: this.handle_onCollectionSort,
                        toggle: this.handle_onAsideToggle
                    }}
                    selected={this.state.selected}
                    state={headerTypes.INSPECTOR}
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
                            active={this.state.current.id}
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