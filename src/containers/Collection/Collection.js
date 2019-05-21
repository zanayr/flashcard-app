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
        group: this.props.select_user.group,
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: this.props.select_user[this.props.match.params.collection],
        tag: this.props.select_user.tag,
        undo: {
            action: null,
            data: {}
        },
        user: this.props.select_user
    }
    undoTimeout = null;

    componentDidMount () {
        const collection = {};
        Object.keys(this.props.select_collection).forEach(id => {
            collection[id] = this.props.select_collection[id];
        });
        this.setState(prev => ({
            ...prev,
            collection: collection,
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
        console.log(collection);
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
    _openFilterAside (filter) {
        this._setAside({
            toggle: (tag) => this.handle_onAsideFilterToggle(filter, tag)
        }, {
            all: this.state[filter],
            filter: this.state.filter[filter],
            tab: this.state.current[filter]
        });
    }
    _openInspectAside (data) {
        this._toggleAside(data.type);
        this._setAside({
            cancel: this.handle_onAsideCancel,
            change: this.handle_onCollectionChange,
            confirm: data.confirm,
            create: this.handle_onTagCreate
        }, {
            group: this.state.group,
            item: data.collection,
            id: data.collection.id,
            tag: this.state.tag
        });
    }

    //  Collections  ----------------------------------------------------------  Collections PM  //
    _addManyCollections = (collections) => {
        this._addManyCollections_async(collections);
        this._clearAndCloseAside();
    }
    _addManyCollections_async (collections) {
        this.props.addMany_async(this.props.match.params.collection, this.props.select_authToken, collections);
    }
    _checkCollection (collection) {
        let valid = true;
        if (!collection.primary.length > 0 && valid) {
            valid = false;
        }
        if (!collection.secondary.length && valid) {
            valid = false
        }
        return valid;
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
            switch (this.props.match.params.collection) {
                case 'deck':
                    cloned.push(create.deckViewModel(utility.createHashId(i), {
                        ...collection,
                        date: Date.now(),
                        primary: primary
                    }));
                    break;
                case 'class':
                    break;
                default:
                    break;
            }
        });
        this._addManyCollections_async(cloned);
        this._setManyCollections(cloned);
        this._clearSelected();
    }
    _createCollection () {
        let collection;
        switch (this.props.match.params.collection) {
            case 'deck':
                collection = create.deckViewModel(utility.createHashId(0), {
                    owner: this.props.select_authUser,
                    primary: '',
                    secondary: '',
                    tag: []
                });
                break;
            case 'class':
                break;
            default:
                break;
        }
        this._setManyCollections([collection]);
        this._openInspectAside({
            confirm: () => this._addManyCollections([this.state.collection[collection.id]]),
            collection: collection,
            type: asideTypes.CREATE_DECK
        });
        this._clearSelected();
    }
    _deleteManyCollections () {
        const collection = {...this.state.collection};
        const selected = this.state.selected.slice();
        selected.forEach(coll => {
            delete collection[coll.id];
            this.props.delete_async(this.props.match.params.collection, this.props.select_authToken, coll);
        });
        this._setCollection(collection);
        this._setUndo({
            action: this._undoManyCollectionsDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteCollection = (collection) => {
        this.props.delete_async(this.props.match.params.collection, this.props.select_authToken, collection);
        this._removeManyCollections([collection]);
        this._setUndo({
            action: this._undoManyCollectionsDeleted,
            data: [collection]
        });
        this._clearSelected();
    }
    _inspectCollection = (collection) => {
        this._openInspectAside({
            confirm: this._updateCollection,
            collection: collection,
            type: asideTypes.INSPECT_DECK
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
        switch (this.props.match.params.collection) {
            case 'deck':
                merged = create.deckViewModel(utility.createHashId(0), {
                    group: group,
                    member: member,
                    owner: this.props.select_authUser,
                    primary: response || 'New Merged ' + this.props.match.params.collection.charAt(0).toUpperCase() + this.props.match.params.collection.slice(1),
                    tag: tag
                });
                break;
            case 'class':
                break;
            default:
                break;
        }
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
        if (this.state.aside.state === asideTypes.CREATE_DECK || this.state.aside.state === asideTypes.INSPECT_DECK) {
            this.handle_onAsideClose();
        }
        this._setSelected(selected);
    }
    _updateCollection = () => {
        const original = this.state.aside.data.item;
        const collection = this.state.collection[original.id];
        if (JSON.stringify(collection) !== JSON.stringify(original)) {
            this.props.update_async(this.props.match.params.collection, this.props.select_authToken, collection);
            this._setUndo({
                action: this._undoCollectionUpdated,
                data: original
            });
        }
        this._clearAndCloseAside();
    }

    //  Tab  ------------------------------------------------------------------ Tab  //
    _deleteTab (tab) {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        // this.props.update_async(this.props.match.params.collection, this.props.select_authToken, {
        //     ...this.state.deck,
        //     tab: tabs
        // });
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
    handle_onAsideCancel = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_DECK:
                this._removeManyCollections([this.state.collection[this.state.aside.data.item.id]]);
                break;
            case asideTypes.INSPECT_DECK:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkCollection(data)) {
                    this._setManyCollections([originalData.item]);
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
            case asideTypes.CREATE_DECK:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkCollection(data)) {
                    this._addManyCollections([data]);
                } else {
                    this._removeManyCollections([data]);
                }
                break;
            case asideTypes.INSPECT_DECK:
                data = this.state.collection[originalData.item.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.item) && this._checkCollection(data)) {
                    this.props.update_async(this.props.match.params.collection, this.props.select_authToken, data);
                    this._setUndo({
                        action: this._undoCollectionUpdated,
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
        this.props.patchTab_async(this.props.select_authToken, this.props.select_authUser, tab);
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
                        collection={utility.sortBy(this.state.sort, this.state.collection)}
                        filters={this.state.filter}
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
                        action: this.handle_onActionToggle,
                        filter: this.handle_onFilterToggle,
                        sort: this.handle_onSortToggle,
                        navigation: this.handle_onNagivationToggle
                    }}
                    selected={this.state.selected}
                    state={headerTypes.COLLECTION}
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
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_collection: select.collection(state, ownProps.match.params.collection),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addMany_async: (store, token, models) => dispatch(actions.addMany_async(store, token, models)),
        delete_async: (store, token, model) => dispatch(actions.delete_async(store, token, model)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);