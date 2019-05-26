import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List2 from '../../components/List/List2';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './Item.module.css';

class Item extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: asideTypes.CLOSED
        },
        assigned: [],
        current: {
            group: [],
            id: 'all',
            tag: []
        },
        internal: [],
        items: {},
        filter: {
            group: [],
            tag: []
        },
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: {},
        undo: {
            action: null,
            data: {}
        },
    }
    undoTimeout = null;

    componentDidMount () {
        const internal = [];
        const items = {};
        let $new = false;
        let $unassigned = false;
        Object.keys(this.props.select_items).forEach(id => {
            if (this.props.select_items[id].tag.includes('$new')) {
                $new = true;
            }
            if (this.props.select_items[id].tag.includes('$unassigned')) {
                $unassigned = true;
            }
            items[id] = this.props.select_items[id];
        });
        if ($new) {
            internal.push('$new');
        }
        if ($unassigned) {
            internal.push('$unassigned');
        }
        this.setState(prev => ({
            ...prev,
            group: this.props.select_user.group.slice(),
            internal: internal,
            items: items,
            main: 'LIST_VIEW',
            tab: this.props.select_user[this.props.match.params.item] || {},
            tag: this.props.select_user.tag.slice()
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
    _setAssigned (assigned) {
        this.setState(prev => ({
            ...prev,
            assigned: assigned
        }));
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
    _removeManyItems (items) {
        const i = this.state.items;
        items.forEach(item => {
            delete i[item.id];
        });
        this.setState(prev => ({
            ...prev,
            items: i
        }));
    }
    _setManyItems (items) {
        const i = this.state.items;
        items.forEach(item => {
            i[item.id] = item;
        });
        this.setState(prev => ({
            ...prev,
            items: i
        }));
    }
    _setItemValue (target, value) {
        const id = this.state.aside.data.item.id;
        this.setState(prev => ({
            ...prev,
            items: {
                ...prev.items,
                [id]: {
                    ...prev.items[id],
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
                }, 5000);
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
            tab: tabs
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
    _openFilterAside () {
        this._setAside({
            cancel: this.handle_onAsideClose,
            toggle: (filter, tag) => this.handle_onAsideFilterToggle(filter, tag)
        }, {
            all: {
                group: this.props.select_user.group.slice(),
                tag: this.props.select_user.tag.concat(this.state.internal)
            },
            filter: {...this.state.filter},
            tab: {...this.state.current}
        });
    }
    _openInspectAside (data) {
        this._toggleAside(data.type);
        this._setAside({
            cancel: this.handle_onAsideClose,
            change: this.handle_onItemChange,
            confirm: data.confirm,
            overlay: data.overlay
        }, {
            group: this.props.select_user.group,
            labels: {
                aux: 'Add More',
                confirm: 'Confirm',
                primary: 'Title',
                secondary: 'Details'
            },
            item: data.item,
            id: data.item.id,
            tag: this.props.select_user.tag
        });
    }
    _setCollectionMembership_async (items) {
        const collections = this.props.select_collections;
        const membership = {};
        items.forEach(item => {
            item.member.forEach(member => {
                if (membership[member]) {
                    membership[member] = membership[member].concat(item.id);
                } else {
                    membership[member] = [item.id];
                }
            });
        });
        Object.keys(membership).forEach(id => {
            this.props.update_async('deck', this.props.select_authToken, {
                ...collections[id],
                member: collections[id].member.concat(membership[id])
            });
        });
    }
    //  Items  ----------------------------------------------------------  Items PM  //
    _addManyItems = (items) => {
        this._addManyItems_async(items);
        this._clearAndCloseAside();
    }
    _updateItem_async (item) {
        this.props.update_async('card', this.props.select_authToken, item);
    }
    _addManyItems_async (items) {
        this.props.addMany_async(this.props.match.params.item, this.props.select_authToken, items);
        this._setCollectionMembership_async(items);
    }
    _cloneManyItems () {
        const cloned = [];
        const selected = this.state.selected.slice();
        selected.forEach((item, i) => {
            let primary;
            if (item.primary.length <= 24) {
                primary = 'Copy of ' + item.primary;
            } else {
                primary = 'Copy of ' + item.primary.substr(0, 21) + '...';
            }
            cloned.push(create.itemViewModel(utility.createHashId(i), {
                ...item,
                date: Date.now(),
                primary: primary
            }));
        });
        this._addManyItems_async(cloned);
        this._setManyItems(cloned);
        this._setManyMembers(cloned);
        this._clearSelected();
    }
    handle_onInspectAsideConfirm = () => {
        const original = this.state.aside.data;
        const inspected = this.state.items[original.item.id];
        if (inspected.primary.length && inspected.secondary.length) {
            if (JSON.stringify(original.item) !== JSON.stringify(inspected)) {
                if (original.item.tag.includes('$create')) {
                    this._addManyItems([inspected]);
                } else {
                    this._updateItem_async(inspected);
                    this._setUndo({
                        action: this._undoItemUpdated,
                        data: original.item
                    });
                }
            } else if (original.tag.includes('$create')) {
                this._removeManyItems([inspected]);
            }
            this._clearAndCloseAside();
        }
    }
    handle_onAsideClose = () => {
        switch (this.state.aside.state) {
            case asideTypes.FILTER:
                this._clearFilter();
                break;
            case asideTypes.INSPECT:
                    const original = this.state.aside.data;
                    const inspected = this.state.item[original.item.id];
                    if (original.tag.includes('$create')) {
                        this._removeManyItems([inspected]);
                    } else if (JSON.stringify(original.item) !== JSON.stringify(inspected)) {
                        this._setManyItems([original.item]);
                    }
                    this._clearAndCloseAside();
                    break;
            default:
                break;
        }
        this._clearAndCloseAside();
    }
    _createItem () {
        const item = create.itemViewModel(utility.createHashId(0), {
            owner: this.props.select_authUser,
            primary: '',
            secondary: '',
            tag: []
        });
        this._setManyItems([item]);
        this._openInspectAside({
            confirm: this.handle_onInspectAsideConfirm,
            overlay: this.handle_onInspectAsideConfirm,
            item: {
                ...item,
                tag: ['$create']
            },
            type: asideTypes.INSPECT
        });
        this._clearSelected();
    }
    _deleteManyItems () {
        const selected = this.state.selected.slice();
        this.props.deleteMany_async(this.props.match.params.item, this.props.select_authToken, selected);
        this._removeCollectionMembership_async(selected);
        this._removeManyItems(selected);
        this._setUndo({
            action: this._undoManyItemsDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _removeCollectionMembership_async (items) {
        const collections = this.props.select_collections;
        const membership = {};
        items.forEach(item => {
            item.member.forEach(member => {
                if (membership[member]) {
                    membership[member] = membership[member].concat(item.id);
                } else {
                    membership[member] = [item.id];
                }
            });
        });
        Object.keys(membership).forEach(id => {
            this.props.update_async('deck', this.props.select_authToken, {
                ...collections[id],
                member: collections[id].member.filter(i => !membership[id].includes(i))
            });
        });
    }
    _deleteItem = (item) => {
        this._deleteManyItems([item]);
    }
    _inspectItem = (item) => {
        this._openInspectAside({
            confirm: this.handle_onInspectAsideConfirm,
            overlay: this.handle_onInspectAsideConfirm,
            item: item,
            type: asideTypes.INSPECT
        });
        this._clearQuick('s');
    }
    _assign = (member) => {
        const item = this.state.aside.data.item;
        this.props.update_async(this.props.match.params.item, this.props.select_authToken, {
            ...item,
            member: member
        });
        this._setItemValue('member', member);
        this._setUndo({
            action: this._undoItemUpdated,
            data: item
        });
    }
    _assignItem = (item) => {
        this._openAssignAside({
            confirm: this._assign,
            item: item,
            type: asideTypes.ASSIGN_ITEM
        });
        this._clearQuick('s');
    }
    _selectItem = (item) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === item.id)) {
            selected = selected.filter(i => i.id !== item.id);
        } else {
            selected = selected.concat(item);
        }
        this._setSelected(selected);
    }
    _updateItem = () => {
        const original = this.state.aside.data.item;
        const item = this.state.items[original.id];
        if (JSON.stringify(item) !== JSON.stringify(original)) {
            this.props.update_async(this.props.match.params.item, this.props.select_authToken, item);
            this._setUndo({
                action: this._undoItemUpdated,
                data: original
            });
        }
        this._clearAndCloseAside();
    }

    //  Tab  ------------------------------------------------------------------ Tab  //
    _deleteTab (tab) {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        this.props.deleteTab_async('user', this.props.match.params.item, this.props.select_authToken, this.props.select_authUser, tab);
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

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    _undoManyItemsDeleted = () => {
        const items = this.state.undo.data.slice();
        this._addManyItems_async(items);
        this._setManyItems(items);
    }
    _undoManyItemsRemoved = () => {
        const items = this.state.undo.data.slice();
        const members = [];
        items.forEach(item => {
            members.push(item.id);
            this.props.update_async(this.props.match.params.item, this.props.select_authToken, item);
        });
        this._setManyItems(items);
    }
    _undoItemUpdated = () => {
        const item = this.state.undo.data;
        this.props.update_async(this.props.match.params.item, this.props.select_authToken, item);
        this._setManyItems([item]);
    }
    

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Action Button  ------------------------------------------  Action Button EH  //
    handle_onActionClick = (action) => {
        switch (action) {
            case 0:
                this._createItem();
                break;
            case 1:
                console.log('Starting study session...');
                break;
            default:
                break;
        }
    }


    //  Aside  ----------------------------------------------------------  Aside EH  //
    handle_onAsideFilterToggle = (category, tag) => {
        let filter = {...this.state.filter};
        if (filter[category].includes(tag)) {
            filter[category] = filter[category].filter(t => t !== tag);
        } else {
            filter[category] = filter[category].concat(tag);
        }
        this._updateAsideData('filter', filter);
        this._setFilter(filter);
    }
    

    //  Header  --------------------------------------------------------  Header EH  //
    handle_onActionToggle = (action) => {
        switch (action) {
            case 0:
                this._deleteManyItems();
                break;
            case 1:
                this._cloneManyItems();
                break;
            default:
                break;
        }
    }
    handle_onFilterToggle = (filter) => {
        this._openFilterAside();
        this._toggleAside(asideTypes.FILTER);
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
        this._setAside({
            cancel: this.handle_onAsideClose
        });
    }
    
    //  Item  ------------------------------------------------------------  Item EH  //
    handle_onItemChange = (target, value) => {
        this._setItemValue(target, value);
    }

    //  List  ------------------------------------------------------------  List EH  //
    handle_onListClick = (action, data) => {
        switch (action) {
            case 0:
                this._selectItem(data);
                break;
            case 1:
                this._inspectItem(data);
                break;
            case 2:
                this._assignItem(data);
                break;
            case 3:
                this._deleteItem(data);
                break;
            default:
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

    // Tab  ---------------------------------------------------------------  Tab EH  //
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
        const tabs = {...this.state.tab};
        tabs[tab.id] = tab;
        this.props.addTab_async('user', this.props.match.params.item, this.props.select_authToken, this.props.select_authUser, tab);
        this._setTab(tabs);
        this._setCurrent(tab);
        this._setMainState('LIST_VIEW');
    }

    render () {
        let content;
        switch (this.state.main) {
            case 'LIST_VIEW':
                content = (
                    <List2
                        action={this.handle_onListClick}
                        collection={utility.sortBy(this.state.sort, this.state.items)}
                        filters={this.state.filter}
                        current={this.state.current}
                        selected={this.state.selected}
                        aux={'assign'}/>
                );
                break;
            case 'ADD_TAB':
                content = (
                    <TabForm
                        tag={this.props.select_user.tag}
                        group={this.props.select_user.group}
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
                <Aside2
                    actions={this.state.aside.actions}
                    data={this.state.aside.data}
                    page={this.props.match.params.item}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_items: select.items(state, ownProps.match.params.item),
        select_collections: select.collections(state, ownProps.match.params.item === 'card' ? 'deck' : 'class'),
        select_user: select.user(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addMany_async: (store, token, items) => dispatch(actions.addMany_async(store, token, items)),
        addTab_async: (store, collection, token, user, model) => dispatch(actions.addTab_async(store, collection, token, user, model)),
        delete_async: (store, token, item) => dispatch(actions.delete_async(store, token, item)),
        deleteMany_async: (store, token, models) => dispatch(actions.deleteMany_async(store, token, models)),
        deleteTab_async: (store, collection, token, user, tab) => dispatch(actions.deleteTab_async(store, collection, token, user, tab)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);