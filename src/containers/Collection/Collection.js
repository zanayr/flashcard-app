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

import styles from './Collection.module.css';

class Collections extends Component {
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
        filter: {
            group: [],
            tag: []
        },
        internal: [],
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: this.props.select_user[this.props.match.params.collection],
        undo: {
            action: null,
            data: {}
        },
        user: this.props.select_user
    }
    undoTimeout = null;

    componentDidMount () {
        const collection = {};
        let $new = false;
        const internal = [];
        Object.keys(this.props.select_collections).forEach(id => {
            if (this.props.select_collections[id].tag.includes('$new')) {
                $new = true;
            }
            collection[id] = this.props.select_collections[id];
        });
        if ($new) {
            internal.push('$new');
        }
        this.setState(prev => ({
            ...prev,
            collection: collection,
            internal: internal,
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
    _setCollection (collection) {
        this.setState(prev => ({
            ...prev,
            collection: collection
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

    //  Collections  ----------------------------------------------------------  Collections SS  //
    _removeManyCollections (collections) {
        const collection = this.state.collection;
        collections.forEach(coll => {
            delete collection[coll.id];
        });
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }
    _setManyCollections (collections) {
        const collection = this.state.collection;
        collections.forEach(coll => {
            collection[coll.id] = coll;
        });
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }
    _setCollectionValue (target, value) {
        const collectionId = this.state.aside.data.item.id;
        this.setState(prev => ({
            ...prev,
            collection: {
                ...prev.collection,
                [collectionId]: {
                    ...prev.collection[collectionId],
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

    handle_onFilterClear = () => {
        this._updateAsideData('filter', {
            group: [],
            tag: []
        });
        this._clearFilter();
    }


    //  PRIVATE METHODS  =========================================  PRIVATE METHODS  //
    //  Aside  ----------------------------------------------------------  Aside PM  //
    _openFilterAside () {
        this._setAside({
            cancel: this.handle_onFilterClear,
            confirm: this.handle_onAsideClose,
            toggle: (filter, tag) => this.handle_onAsideFilterToggle(filter, tag)
        }, {
            all: {
                group: this.props.select_user.group.slice(),
                tag: this.props.select_user.tag.concat(this.state.internal)
            },
            labels: {
                confirm: 'Close'
            },
            filter: {...this.state.filter},
            tab: {...this.state.current}
        });
    }
    _openInspectAside (data) {
        this._toggleAside(data.type);
        this._setAside({
            cancel: this.handle_onAsideClose,
            change: this.handle_onCollectionChange,
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
            item: data.collection,
            id: data.collection.id,
            tag: this.props.select_user.tag
        });
    }
    _setItemMembership_async (collections) {
        const items = this.props.select_items;
        collections.forEach(collection => {
            if (collection.member.length) {
                collection.member.forEach(id => {
                    this.props.update_async('card', this.props.select_authToken, {
                        ...items[id],
                        member: items[id].member.concat(collection.id)
                    });
                });
            }
        });
    }

    //  Collections  ----------------------------------------------------------  Collections PM  //
    _addManyCollections = (collections) => {
        this._addManyCollections_async(collections);
        this._clearAndCloseAside();
    }
    _updateCollection_async (collection) {
        this.props.update_async('deck', this.props.select_authToken, collection);
    }
    _addManyCollections_async (collections) {
        this.props.addMany_async(this.props.match.params.collection, this.props.select_authToken, collections);
        this._setItemMembership_async(collections);
    }
    _cloneManyCollections () {
        const cloned = [];
        const selected = this.state.selected.slice();
        selected.forEach((collection, i) => {
            let primary;
            if (collection.primary.length <= 24) {
                primary = 'Copy of ' + collection.primary;
            } else {
                primary = 'Copy of ' + collection.primary.substr(0, 21) + '...';
            }
            cloned.push(create.collectionViewModel(utility.createHashId(i), {
                ...collection,
                date: Date.now(),
                primary: primary
            }));
        });
        this._addManyCollections_async(cloned);
        this._setManyCollections(cloned);
        this._clearSelected();
    }
    handle_onInspectAsideConfirm = () => {
        const original = this.state.aside.data;
        const inspected = this.state.collection[original.item.id];
        if (inspected.primary.length && inspected.secondary.length) {
            if (JSON.stringify(original.item) !== JSON.stringify(inspected)) {
                if (original.item.tag.includes('$create')) {
                    this._addManyCollections([inspected]);
                } else {
                    this._updateCollection_async(inspected);
                    this._setUndo({
                        action: this._undoCollectionUpdated,
                        data: original.item
                    });
                }
            } else if (original.tag.includes('$create')) {
                this._removeManyCollections([inspected]);
            }
            this._clearAndCloseAside();
        }
    }
    handle_onAsideClose = () => {
        switch (this.state.aside.state) {
            case asideTypes.INSPECT:
                    const original = this.state.aside.data;
                    const inspected = this.state.collection[original.item.id];
                    if (original.tag.includes('$create')) {
                        this._removeManyCollections([inspected]);
                    } else if (JSON.stringify(original.item) !== JSON.stringify(inspected)) {
                        this._setManyCollections([original.item]);
                    }
                    this._clearAndCloseAside();
                    break;
            default:
                break;
        }
        this._clearAndCloseAside();
    }


    _createCollection () {
        const collection = create.collectionViewModel(utility.createHashId(0), {
            owner: this.props.select_authUser,
            primary: '',
            secondary: '',
            tag: []
        });
        this._setManyCollections([collection]);
        this._openInspectAside({
            confirm: this.handle_onInspectAsideConfirm,
            overlay: this.handle_onInspectAsideConfirm,
            collection: {
                ...collection,
                tag: ['$create']
            },
            type: asideTypes.INSPECT
        });
        this._clearSelected();
    }
    _removeItemMembership_async (collections) {
        const items = this.props.select_items;
        collections.forEach(collection => {
            if (collection.member.length) {
                collection.member.forEach(id => {
                    this.props.update_async('card', this.props.select_authToken, {
                        ...items[id],
                        member: items[id].member.filter(i => i !== collection.id)
                    });
                });
            }
        });
    }
    _deleteManyCollections () {
        const selected = this.state.selected.slice();
        this.props.deleteMany_async('deck', this.props.select_authToken, selected);
        this._removeItemMembership_async(selected);
        this._removeManyCollections(selected);
        this._setUndo({
            action: this._undoManyCollectionsDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteCollection = (collection) => {
        this._deleteManyCollections([collection]);
    }
    _inspectCollection = (collection) => {
        this._openInspectAside({
            confirm: this.handle_onInspectAsideConfirm,
            overlay: this.handle_onInspectAsideConfirm,
            collection: collection,
            type: asideTypes.INSPECT
        });
        this._clearQuick('s');
    }
    _mergeManyCollections = (response) => {
        const group = [];
        const member = [];
        const tag = [];
        let merged;
        this.state.selected.forEach(collection => {
            collection.group.forEach(t => {
                if (!group.includes(t)) {
                    group.push(t);
                }
            });
            collection.member.forEach(m => {
                if (!member.includes(m)) {
                    member.push(m);
                }
            });
            collection.tag.forEach(t => {
                if (!tag.includes(t)) {
                    tag.push(t);
                }
            });
        });
        merged = create.collectionViewModel(utility.createHashId(0), {
            group: group,
            member: member,
            owner: this.props.select_authUser,
            primary: response || 'New Merged ' + this.props.match.params.collection.charAt(0).toUpperCase() + this.props.match.params.collection.slice(1),
            tag: tag
        });
        this._addManyCollections_async([merged]);
        this._setManyCollections([merged]);
        this._clearSelected();
    }
    _selectCollection = (collection) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === collection.id)) {
            selected = selected.filter(i => i.id !== collection.id);
        } else {
            selected = selected.concat(collection);
        }
        this._setSelected(selected);
    }

    //  Tab  ------------------------------------------------------------------ Tab  //
    _deleteTab (tab) {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        this.props.deleteTab_async('user', this.props.match.params.collection, this.props.select_authToken, this.props.select_authUser, tab);
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
    _undoManyCollectionsDeleted = () => {
        const collections = this.state.undo.data.slice();
        this._addManyCollections_async(collections);
        this._setManyCollections(collections);
    }
    _undoCollectionUpdated = () => {
        const collection = this.state.undo.data;
        this.props.update_async(this.props.match.params.collection, this.props.select_authToken, collection);
        this._setManyCollections([collection]);
    }
    

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Action Button  ------------------------------------------  Action Button EH  //
    handle_onActionClick = (action) => {
        switch (action) {
            case 0:
                this._createCollection();
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
    handle_onActionToggle = (action, data) => {
        switch (action) {
            case 0:
                this._deleteManyCollections();
                break;
            case 1:
                this._cloneManyCollections();
                break;
            case 2:
                this._mergeManyCollections(data);
                break;
            default:
                break;
        }
    }
    handle_onFilterToggle = () => {
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
    
    //  Collection  ------------------------------------------------------------  Collection EH  //
    handle_onCollectionChange = (target, value) => {
        this._setCollectionValue(target, value);
    }

    //  List  ------------------------------------------------------------  List EH  //
    handle_onListClick = (action, data) => {
        switch (action) {
            case 0:
                this._selectCollection(data);
                break;
            case 1:
                this._inspectCollection(data);
                break;
            case 2:
                this._removeCollection(data);
                break;
            case 3:
                this._deleteCollection(data);
                break;
            default:
                break;
        }
    }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    handle_onDefaultClick = () => {
        this.handle_onAsideClose();
        this._clearSelected();
        this._clearFilter();
    }

    //  Quicks  ----------------------------------------------------------  Quicks EH  //
    handle_onQuickClick = (quick) => {
        switch (quick) {
            case 0:
                this._updateAsideData('filter', {
                    group: [],
                    tag: []
                });
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
        this.props.addTab_async('user', this.props.match.params.collection, this.props.select_authToken, this.props.select_authUser, tab);
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
                        collection={utility.sortBy(this.state.sort, this.state.collection)}
                        filters={this.state.filter}
                        current={this.state.current}
                        selected={this.state.selected}/>
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
                    state={headerTypes.COLLECTION}
                    onClick={this.handle_onDefaultClick}/>
                <main
                    className={styles.Main}
                    onClick={this.handle_onDefaultClick}>
                    <div>
                        <TabBar
                            action={this.handle_onTabToggle}
                            active={this.state.current.id}
                            collection={this.state.tab}
                            onClick={this.handle_onDefaultClick}/>
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
                    page={this.props.match.params.collection}
                    data={this.state.aside.data}
                    state={this.state.aside.state}/>
            </Aux>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_collections: select.collections(state, ownProps.match.params.collection),
        select_items: select.items(state, 'card'),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addMany_async: (store, token, models) => dispatch(actions.addMany_async(store, token, models)),
        addTab_async: (store, collection, token, user, model) => dispatch(actions.addTab_async(store, collection, token, user, model)),
        delete_async: (store, token, model) => dispatch(actions.delete_async(store, token, model)),
        deleteMany_async: (store, token, models) => dispatch(actions.deleteMany_async(store, token, models)),
        deleteTab_async: (store, collection, token, user, tab) => dispatch(actions.deleteTab_async(store, collection, token, user, tab)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);