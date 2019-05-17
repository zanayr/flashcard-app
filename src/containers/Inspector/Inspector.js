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
        filter: {
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
    undoTimeout = null;


    componentDidMount () {
        const cards = this.props.select_cards;
        const deck = this.props.select_deck;
        const collection = {};
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

    //  STATE SETTERS  ==============================================  STATE SETTERS  //
    //  Aside  -----------------------------------------------------------  Aside SS  //
    _clearAndCloseAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {},
                data: {},
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
    _setAside (actions, data) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {
                    ...data
                },
                actions: {
                    ...actions
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
    _toggleAside (state) {
        if (this.state.aside.state !== asideTypes.CLOSED) {
            if (state !== this.state.aside.state) {
                this._openAside(state);
            } else {
                this._clearAndCloseAside();
            }
        } else {
            this._openAside(state);
        }
    }

    //  Collection  ------------------------------------------------  Collection SS  //
    _setCollection (collection) {
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

    //  Current  ------------------------------------------------------  Current SS  //
    _setCurrent (tab) {
        this.setState(prev => ({
            ...prev,
            current: {...tab}
        }));
    }

    //  Filter  --------------------------------------------------------  Filter SS  //
    _clearFilter () {
        this.setState(prev => ({
            ...prev,
            filter: {
                group: [],
                tag: []
            }
        }));
        this._clearQuick('f');
    }
    _setFilter (filter) {
        this.setState(prev => ({
            ...prev,
            filter: filter
        }));
        if (filter.tag.length || filter.group.length) {
            this._setQuick('f');
        } else {
            this._clearQuick('f');
        }
    }

    //  Items  ----------------------------------------------------------  Items SS  //
    _removeItems (items) {
        const collection = this.state.collection;
        const nonmembers = items.map(item => {return item.id});
        items.forEach(item => {
            delete collection[item.id];
        });
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                member: prev.deck.member.filter(id => !nonmembers.includes(id))
            }
        }));
    }
    _setItems (items) {
        const collection = this.state.collection;
        items.forEach(item => {
            collection[item.id] = item;
        });
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }
    _setMembers (items) {
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                member: prev.deck.member.concat(items.map(item => {return item.id}))
            }
        }));
    }
    _setItemValue (target, value) {
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

    //  Selected  ----------------------------------------------------  Selected SS  //
    _clearSelected () {
        this.setState(prev => ({
            ...prev,
            selected: []
        }));
        this._clearQuick('s');
    }
    _setSelected (selected) {
        this.setState(prev => ({
            ...prev,
            selected: selected
        }));
        if (selected.length) {
            this._setQuick('s');
        } else {
            this._clearQuick('s');
        }
    }

    //  Main  ------------------------------------------------------------  Main SS  //
    _setMainState (state) {
        this.setState(prev => ({
            ...prev,
            main: state
        }));
    }

    //  Quick  ----------------------------------------------------------  Quick SS  //
    _clearQuick (value) {
        if (value === 'u') {
            clearTimeout(this.undoTimeout);
        }
        this.setState(prev => ({
            ...prev,
            quick: prev.quick.filter(q => q !== value)
        }));
    }
    _setQuick (value) {
        if (!this.state.quick.includes(value)) {
            if (value === 'u') {
                clearTimeout(this.undoTimeout);
                this.undoTimeout = setTimeout(() => {
                    this._clearQuick('u');
                    this._clearUndo();
                }, 60000);
            }
            this.setState(prev => ({
                ...prev,
                quick: prev.quick.concat(value)
            }));
        }
    }

    //  Tab  --------------------------------------------------------------  Tab SS  //
    _setTab (tabs) {
        this.setState(prev => ({
            ...prev,
            deck: {
                ...prev.deck,
                tab: tabs
            },
            tab: tabs
        }));
    }

    //  Tag & Group  ----------------------------------------------  Tag & Group SS  //
    _addTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }

    //  Sort  ------------------------------------------------------------  Sort SS  //
    _setSort (sort) {
        this.setState(prev => ({
            ...prev,
            sort: sort
        }));
    }

    //  Undo  -----------------------------------------------------------  Undo SS  //
    _clearUndo () {
        this.setState(prev => ({
            ...prev,
            undo: {
                action: null,
                data: {}
            }
        }));
        this._clearQuick('u');
    }
    _setUndo (undo) {
        this.setState(prev => ({
            ...prev,
            undo: undo
        }));
        this._setQuick('u');
    }


    //  PRIVATE METHODS  =========================================  PRIVATE METHODS  //
    //  Aside  ----------------------------------------------------------  Aside PM  //
    _addItems_async (items) {
        this.props.addManyCards_async(this.props.token, items);
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            member: this.state.deck.member.concat(items.map(item => {
                return item.id;
            }))
        });
    }
    _openInspectAside (data) {
        this._toggleAside(data.type);
        this._setAside({
            cancel: this.handle_onAsideCancel,
            change: this.handle_onItemChange,
            confirm: data.confirm,
            create: this.handle_onTagCreate
        }, {
            group: this.state.group,
            item: data.item,
            deckId: this.state.deck.id,
            tag: this.state.tag
        });
    }

    //  Items  ----------------------------------------------------------  Items PM  //
    _checkItem (item) {
        let valid = true;
        if (!item.primary.length > 0 && valid) {
            valid = false;
        }
        if (!item.secondary.length && valid) {
            valid = false
        }
        return valid;
    }

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    
    _undoItemsDelete = () => {
        const items = this.state.undo.data.slice();
        this._addItems_async(items);
        this._setItems(items);
        this._setMembers(items);
    }
    /*
    this.props.updateCard_async(this.props.select_token, {
        ...item,
        member: item.member.filter(id => id !== this.state.deck.id)
    });
    this.props.updateDeck_async(this.props.select_token, {
        ...this.state.deck,
        member: this.state.deck.member.filter(id => id !== item.id)
    });
    this._removeItems([item]);
    this._setUndo({
        action: this._undoItemRemove,
        data: [item]
    });
    */
    _undoItemRemove = () => {
        const items = this.state.undo.data.slice();
        const members = [];
        items.forEach(item => {
            members.push(item.id);
            this.props.updateCard_async(this.props.select_token, item);
        });
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.concat(members)
        });
        this._setItems(items);
        this._setMembers(items);
    }
    _undoItemUpdate = () => {
        const item = this.state.undo.data;
        this.props.updateCard_async(this.props.token, item);
        this._setItems([item]);
    }

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Action Button  ------------------------------------------  Action Button EH  //
    handle_onActionClick = () => {
        const item = create.cardViewModel(utility.createHashId(0), {
            member: [this.state.deck.id],
            owner: this.props.select_user.id,
            primary: '',
            secondary: '',
            tag: []
        });
        this._setItems([item]);
        this._openInspectAside({
            confirm: () => this.handle_onItemCreate(this.state.collection[item.id]),
            item: item,
            type: asideTypes.CREATE_CARD
        });
        this._clearSelected();
    }


    //  Aside  ----------------------------------------------------------  Aside EH  //
    handle_onAsideCancel = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_CARD:
                this._removeItems([this.state.collection[this.state.aside.data.item.id]]);
                break;
            case asideTypes.INSPECT_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this._setItems([originalData.item]);
                }
                break;
            default:
                break;
        }
        this._clearAndCloseAside();
    }
    handle_onAsideClose = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this.handle_onItemCreate(data);
                } else {
                    this._removeItems([data]);
                }
                break;
            case asideTypes.INSPECT_CARD:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this.props.updateCard_async(this.props.token, data);
                    this._setUndo({
                        action: this._undoItemUpdate,
                        data: originalData.item
                    });
                }
                break;
            default:
                break;
        }
        this._clearAndCloseAside();
    }
    handle_onAsideFilterToggle = (category, tag) => {
        let filter = {...this.state.filter};
        if (filter[category].includes(tag)) {
            filter[category] = filter[category].filter(t => t !== tag);
        } else {
            filter[category] = filter[category].concat(tag);
        }
        this._updateAsideData('filter', filter[category]);
        this._setFilter(filter);
    }  

    //  Items  ----------------------------------------------------------  Items EH  //
    handle_onItemCreate = (item) => {
        this._addItems_async([item]);
        this._setMembers([item]);
        this._clearAndCloseAside();
    }
    handle_onItemChange = (target, value) => {
        this._setItemValue(target, value);
    }
    handle_onItemUpdate = () => {
        const original = this.state.aside.data.item;
        const item = this.state.collection[original.id];
        if (JSON.stringify(item) !== JSON.stringify(original)) {
            this.props.updateCard_async(this.props.token, item);
            this._setUndo({
                action: this._undoItemUpdate,
                data: original
            });
        }
        this._clearAndCloseAside();
    }

    //  Header  --------------------------------------------------------  Header EH  //
    _deleteItems () {
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
        this._setCollection(collection);
        this._setUndo({
            action: this._undoItemsDelete,
            data: selected
        });
        this._clearSelected();
    }
    _cloneItems () {
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
        this._addItems_async(cloned);
        this._setItems(cloned);
        this._setMembers(cloned);
        this._clearSelected();
    }
    _openFilter (filter) {
        this._setAside({
            toggle: (tag) => this.handle_onAsideFilterToggle(filter, tag)
        }, {
            all: this.state[filter],
            filter: this.state.filter[filter],
            tab: this.state.current[filter]
        });
    }

    handle_onActionToggle = (action) => {
        switch (action) {
            case 0:
                this._deleteItems();
                break;
            case 1:
                this._cloneItems();
                break;
            default:
                break;
        }
    }
    handle_onFilterToggle = (filter) => {
        switch (filter) {
            case 0:
                this._openFilter('tag');
                this._toggleAside(asideTypes.FILTER_TAG)
                break;
            case 1:
                this._openFilter('group');
                this._toggleAside(asideTypes.FILTER_GROUP);
                break;
            default:
                break;
        }
    }
    handle_onSortToggle = (sort) => {
        switch (sort) {
            case 0:
                this._setSort(sortTypes.ALPHA_ASC);
                break;
            case 1:
                this._setSort(sortTypes.ALPHA_DSC);
                break;
            case 2:
                this._setSort(sortTypes.DATE_ASC);
                break;
            case 3:
                this._setSort(sortTypes.DATE_DSC);
                break;
            default:
                break;
        }
    }
    handle_onNagivationToggle = () => {
        this._toggleAside(asideTypes.NAVIGATION);
    }

    //  List  ------------------------------------------------------------  List EH  //
    _deleteItem = (item) => {
        this.props.deleteCard_async(this.props.select_token, item);
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => id !== item.id)
        });
        this._removeItems([item]);
        this._setUndo({
            action: this._undoItemsDelete,
            data: [item]
        });
        this._clearSelected();
    }
    _inspectItem = (item) => {
        this._openInspectAside({
            confirm: this.handle_onItemUpdate,
            item: item,
            type: asideTypes.INSPECT_CARD
        });
        this._clearQuick('s');
    }
    _removeItem = (item) => {
        this.props.updateCard_async(this.props.select_token, {
            ...item,
            member: item.member.filter(id => id !== this.state.deck.id)
        });
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => id !== item.id)
        });
        this._removeItems([item]);
        this._setUndo({
            action: this._undoItemRemove,
            data: [item]
        });
        this._clearSelected();
    }
    _selectItem = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        if (this.state.aside.state === asideTypes.CREATE_CARD || this.state.aside.state === asideTypes.INSPECT_CARD) {
            this.handle_onAsideClose();
        }
        this._setSelected(selected);
    }

    handle_onListAction = (action, data) => {
        switch (action) {
            case 0:
                this._selectItem(data);
                break;
            case 1:
                this._inspectItem(data);
                break;
            case 2:
                this._removeItem(data);
                break;
            case 3:
                this._deleteItem(data);
                break;
        }
    }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    handle_onMainClick = () => {
        this.handle_onAsideClose();
        this._clearSelected();
        this._clearFilter();
    }

    //  Quicks  ----------------------------------------------------------  Quicks EH  //
    handle_onQuickClick = (quick) => {
        switch (quick) {
            case 0:
                this._updateAsideData('filter', []);
                this._clearFilter();
                break;
            case 1:
                this._clearSelected();
                break;
            case 2:
                this.state.undo.action();
                this._clearUndo();
                break;
            default:
                break;
        }
    }

    // //  Tab  -------------------------------------------------------------  Tab EHs  //
    _deleteTab (tab) {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: tabs
        });
        this._setTab(tabs);
        if (this.state.current.id === tab.id) {
            this._setCurrent({
                group: [],
                id: 'all',
                tag: []
            });
        }
    }
    _selectTab (tab) {
        this._setCurrent(tab);
        this._clearSelected();
        if (this.state.main === 'ADD_TAB') {
            this._setMainState('LIST_VIEW');
        }
        if (this.state.aside.state !== asideTypes.CLOSED) {
            this._clearFilter();
            this._clearAndCloseAside();
        }
    }

    handle_onTabToggle = (tab, data) => {
        switch (tab) {
            case 0:
                this._setMainState('ADD_TAB');
                break;
            case 1:
                this._selectTab(data);
                break;
            case 2:
                this._deleteTab(data);
                break;
            default:
                break;
        }
    }
    
    handle_onTabCreate = (tab) => {
        const tabs = {...this.state.deck.tab};
        tabs[tab.id] = tab;
        this.props.updateDeck_async(this.props.token, {
            ...this.state.deck,
            tab: tabs
        });
        this._setTab(tabs);
        this._setCurrent(tab);
        this._setMainState('LIST_VIEW');
    }

    //  Tag  -----------------------------------------------------------------  Tag  //
    handle_onTagCreate = (category, tag) => {
        this._addTag(category, tag);
    }


    render () {
        let content;
        switch (this.state.main) {
            case 'LIST_VIEW':
                content = (
                    <List2
                    action={this.handle_onListAction}
                    collection={utility.sortBy(this.state.sort, this.state.collection)}
                    filters={this.state.filter}
                    current={this.state.current}
                    selected={this.state.selected}
                    remove/>
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
                        action: this.handle_onActionToggle,
                        filter: this.handle_onFilterToggle,
                        sort: this.handle_onSortToggle,
                        navigation: this.handle_onNagivationToggle
                    }}
                    selected={this.state.selected}
                    state={headerTypes.INSPECTOR}
                    onClick={this.handle_onAsideClose}/>
                <main
                    className={styles.Main}
                    onClick={this.handle_onMainClick}>
                    <div>
                        <TabBar
                            action={this.handle_onTabToggle}
                            active={this.state.current.id}
                            collection={this.state.tab}
                            onClick={this.handle_onAsideClose}/>
                        {content}
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={0}
                            values={['Create', 'Study']}/>
                        <QuickBar
                            action={this.handle_onQuickClick}
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