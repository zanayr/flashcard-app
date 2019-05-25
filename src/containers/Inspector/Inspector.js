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
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List2 from '../../components/List/List2';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import Throbber from '../../components/ui/Throbber/Throbber';
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
        internal: [],
        items: {},
        collection: {},
        filter: {
            group: [],
            tag: []
        },
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: this.props.select_collection.tab,
        undo: {
            action: null,
            data: {}
        },
    }
    page = this.props.match.params.collection === 'deck' ? 'card' : 'student';
    undoTimeout = null;

    componentDidMount () {
        const items = {};
        const collection = {...this.props.select_collection};
        let $new = false;
        const internal = [];
        Object.keys(this.props.select_items).filter(id => collection.member.includes(id)).forEach(id => {
            if (this.props.select_items[id].tag.includes('$new')) {
                $new = true;
            }
            items[id] = this.props.select_items[id];
        });
        if ($new) {
            internal.push('$new');
        }

        this.setState(prev => ({
            ...prev,
            collection: collection,
            internal: internal,
            items: items,
            main: 'LIST_VIEW'
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
    // _setCollection (collection) {
    //     const members = Object.keys(collection).map(id => {return id});
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection,
    //         deck: {
    //             ...prev.deck,
    //             member: members
    //         }
    //     }));
    // }

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
    _removeManyItems (items) {
        const i = this.state.items;
        const nonmembers = items.map(item => {return item.id});
        items.forEach(item => {
            delete i[item.id];
        });
        this.setState(prev => ({
            ...prev,
            items: i
        }));
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                member: prev.collection.member.filter(id => !nonmembers.includes(id))
            }
        }));
    }
    _setItems (items) {
        this.setState(prev => ({
            ...prev,
            items: items
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
    _setManyMembers (items) {
        console.log(items);
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                member: prev.collection.member.concat(items.map(item => {return item.id}))
            }
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
        console.log('clear selected');
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
            collection: {
                ...prev.collection,
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
        console.log(undo);
        this.setState(prev => ({
            ...prev,
            undo: undo
        }));
        this._setQuick('u');
    }


    //  PRIVATE METHODS  =========================================  PRIVATE METHODS  //
    //  Aside  ----------------------------------------------------------  Aside PM  //
    _openFilterAside (filter) {
        let all;
        if (filter === 'tag') {
            all = this.props.select_user.tag.concat(this.state.internal);
        } else {
            all = this.props.select_user.group.slice();
        }
        this._setAside({
            toggle: (tag) => this.handle_onAsideFilterToggle(filter, tag)
        }, {
            all: all,
            filter: this.state.filter[filter].slice(),
            tab: this.state.current[filter].slice()
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
            group: this.props.select_user.group,
            item: data.item,
            id: this.state.collection.id,
            tag: this.props.select_user.tag
        });
    }

    //  Items  ----------------------------------------------------------  Items PM  //
    _addManyItems = (items) => {
        this._addManyItems_async(items);
        this._setManyMembers(items);
        this._clearAndCloseAside();
    }
    _addManyItems_async (items) {
        console.log(this.page);
        this.props.addMany_async(this.page, this.props.select_authToken, items);
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
            member: this.state.collection.member.concat(items.map(item => {
                return item.id;
            }))
        });
    }
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
            switch (this.page) {
                case 'card':
                        cloned.push(create.itemViewModel(utility.createHashId(i), {
                            ...item,
                            date: Date.now(),
                            primary: primary
                        }));
                    break;
                case 'student':
                    break;
                default:
                    break;
            }
        });
        this._addManyItems_async(cloned);
        this._setManyItems(cloned);
        this._setManyMembers(cloned);
        this._clearSelected();
    }
    _createItem () {
        const item = create.itemViewModel(utility.createHashId(0), {
            member: [this.state.collection.id],
            owner: this.props.select_authUser,
            primary: '',
            secondary: '',
            tag: []
        });
        
        this._setManyItems([item]);
        this._openInspectAside({
            confirm: () => this._addManyItems([this.state.items[item.id]]),
            item: item,
            type: asideTypes.CREATE_ITEM
        });
        this._clearSelected();
    }
    _deleteManyItems () {
        const items = {...this.state.items};
        const selected = this.state.selected.slice();
        const nonmembers = [];
        const deleted = {}
        selected.forEach(item => {
            nonmembers.push(item.id);
            delete items[item.id];
            // this.props.delete_async(this.page, this.props.select_authToken, item);
        });
        //  Update entire store in the database and redux with updated collection of models
        this.props.deleteMany_async(this.page, this.props.select_authToken, selected);
        //  Update collection in the database and redux with new array of members
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
            member: this.state.collection.member.filter(id => !nonmembers.includes(id))
        });
        this._setItems(items);
        this._setManyMembers(Object.keys(items).map(i => {return items[i]}));
        this._setUndo({
            action: this._undoManyItemsDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteItem = (item) => {
        this.props.delete_async(this.page, this.props.select_authToken, item);
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
            member: this.state.collection.member.filter(id => id !== item.id)
        });
        this._removeManyItems([item]);
        this._setUndo({
            action: this._undoManyItemsDeleted,
            data: [item]
        });
        this._clearSelected();
    }
    _inspectItem = (item) => {
        this._openInspectAside({
            confirm: this._updateItem,
            item: item,
            type: asideTypes.INSPECT_ITEM
        });
        this._clearQuick('s');
    }
    _removeItem = (item) => {
        this.props.update_async(this.page, this.props.select_authToken, {
            ...item,
            member: item.member.filter(id => id !== this.state.collection.id)
        });
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
            member: this.state.collection.member.filter(id => id !== item.id)
        });
        this._removeManyItems([item]);
        this._setUndo({
            action: this._undoManyItemsRemoved,
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
        if (this.state.aside.state === asideTypes.CREATE_ITEM || this.state.aside.state === asideTypes.INSPECT_ITEM) {
            this.handle_onAsideClose();
        }
        this._setSelected(selected);
    }
    _updateItem = () => {
        const original = this.state.aside.data.item;
        const item = this.state.items[original.id];
        if (JSON.stringify(item) !== JSON.stringify(original)) {
            this.props.update_async(this.page, this.props.select_authToken, item);
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
        console.log(this.state.collection);
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
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

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    _undoManyItemsDeleted = () => {
        const items = this.state.undo.data.slice();
        this._addManyItems_async(items);
        this._setManyItems(items);
        this._setManyMembers(items);
    }
    _undoManyItemsRemoved = () => {
        const items = this.state.undo.data.slice();
        const members = [];
        items.forEach(item => {
            members.push(item.id);
            this.props.update_async(this.page, this.props.select_authToken, item);
        });
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
            member: this.state.collection.member.concat(members)
        });
        this._setManyItems(items);
        this._setManyMembers(items);
    }
    _undoItemUpdated = () => {
        const item = this.state.undo.data;
        this.props.update_async(this.page, this.props.select_authToken, item);
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
    handle_onAsideCancel = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_ITEM:
                this._removeManyItems([this.state.items[this.state.aside.data.item.id]]);
                break;
            case asideTypes.INSPECT_ITEM:
                data = this.state.items[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this._setManyItems([originalData.item]);
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
            case asideTypes.CREATE_ITEM:
                data = this.state.items[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this._addManyItems([data]);
                } else {
                    this._removeManyItems([data]);
                }
                break;
            case asideTypes.INSPECT_ITEM:
                data = this.state.items[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkItem(data)) {
                    this.props.update_async(this.page, this.props.select_authToken, data);
                    this._setUndo({
                        action: this._undoItemUpdated,
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
    

    //  Header  --------------------------------------------------------  Header EH  //
    handle_onActionToggle = (action) => {
        console.log(action);
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
        switch (filter) {
            case 0:
                this._openFilterAside('tag');
                this._toggleAside(asideTypes.FILTER_TAG)
                break;
            case 1:
                this._openFilterAside('group');
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
                this._removeItem(data);
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
        const tabs = {...this.state.collection.tab};
        tabs[tab.id] = tab;
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
            ...this.state.collection,
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
                        action={this.handle_onListClick}
                        collection={utility.sortBy(this.state.sort, this.state.items)}
                        filters={this.state.filter}
                        current={this.state.current}
                        selected={this.state.selected}
                        aux={'remove'}/>
                );
                break;
            case 'ADD_TAB':
                content = (
                    <TabForm
                        group={this.props.select_user.group}
                        tag={this.props.select_user.tag}
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
                    page={this.page}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_collection: select.collection(state, ownProps.match.params.collection, ownProps.match.params.id),
        select_items: select.items(state, ownProps.match.params.collection === 'deck' ? 'card' : 'student'),
        select_user: select.user(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addMany_async: (store, token, items) => dispatch(actions.addMany_async(store, token, items)),
        delete_async: (store, token, item) => dispatch(actions.delete_async(store, token, item)),
        deleteMany_async: (store, token, items) => dispatch(actions.deleteMany_async(store, token, items)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model))
        // update2_async: (store, token, models) => dispatch(actions.update2_async(store, token, models))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspector);