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
        const decks = this.props.select_decks;
        const collection = {};
        Object.keys(decks).forEach(id => {
            collection[id] = decks[id];
        });
        this.setState(prev => ({
            ...prev,
            collection: collection,
            main: 'LIST_VIEW',
            tab: this.props.user.tab
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
            collection: collection,
            deck: {
                ...prev.deck
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

    //  Collections  ----------------------------------------------------------  Collections SS  //
    // _removeManyCollections (collections) {
    //     const collection = this.state.collection;
    //     const nonmembers = collections.map(collection => {return collection.id});
    //     collections.forEach(collection => {
    //         delete collection[collection.id];
    //     });
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection
    //     }));
    //     this.setState(prev => ({
    //         ...prev,
    //         deck: {
    //             ...prev.deck,
    //             member: prev.deck.member.filter(id => !nonmembers.includes(id))
    //         }
    //     }));
    // }
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
    // _setManyMembers (collections) {
    //     this.setState(prev => ({
    //         ...prev,
    //         deck: {
    //             ...prev.deck,
    //             member: prev.deck.member.concat(collections.map(collection => {return collection.id}))
    //         }
    //     }));
    // }
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
            deckId: data.collection.id,
            tag: this.state.tag
        });
    }

    //  Collections  ----------------------------------------------------------  Collections PM  //
    _addManyCollections = (collections) => {
        this._addManyCollections_async(collections);
        // this._setManyMembers(collections);
        this._clearAndCloseAside();
    }
    _addManyCollections_async (collections) {
        this.props.addManyDecks_async(this.props.token, collections);
        // this.props.updateDeck_async(this.props.token, {
        //     ...this.state.deck,
        //     member: this.state.deck.member.concat(collections.map(collection => {
        //         return collection.id;
        //     }))
        // });
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
            cloned.push(create.deckViewModel(utility.createHashId(i), {
                ...collection,
                date: Date.now(),
                primary: primary
            }));
        });
        this._addManyCollections_async(cloned);
        this._setManyCollections(cloned);
        // this._setManyMembers(cloned);
        this._clearSelected();
    }
    _createCollection () {
        const collection = create.deckViewModel(utility.createHashId(0), {
            owner: this.props.select_user.id,
            primary: '',
            secondary: '',
            tag: []
        });
        this._setManyCollections([collection]);
        this._openInspectAside({
            confirm: () => this._addManyCollections([this.state.collection[collection.id]]),
            collection: collection,
            type: asideTypes.CREATE_DECK
        });
        this._clearSelected();
    }
    _deleteManyCollections () {
        const collection = this.state.collection;
        const selected = this.state.selected.slice();
        const nonmembers = [];
        selected.forEach(collection => {
            nonmembers.push(collection.id);
            delete collection[collection.id];
            this.props.deleteDeck_async(this.props.select_token, collection);
        });
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => !nonmembers.includes(id))
        });
        this._setCollection(collection);
        this._setUndo({
            action: this._undoManyCollectionsDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteCollection = (collection) => {
        this.props.deleteDeck_async(this.props.select_token, collection);
        this.props.updateDeck_async(this.props.select_token, {
            ...this.state.deck,
            member: this.state.deck.member.filter(id => id !== collection.id)
        });
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
    // _removeCollection = (collection) => {
    //     this.props.updateDeck_async(this.props.select_token, {
    //         ...collection,
    //         member: collection.member.filter(id => id !== this.state.deck.id)
    //     });
    //     this.props.updateDeck_async(this.props.select_token, {
    //         ...this.state.deck,
    //         member: this.state.deck.member.filter(id => id !== collection.id)
    //     });
    //     this._removeManyCollections([collection]);
    //     this._setUndo({
    //         action: this._undoManyCollectionsRemoved,
    //         data: [collection]
    //     });
    //     this._clearSelected();
    // }
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
            this.props.updateDeck_async(this.props.token, collection);
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

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    _undoManyCollectionsDeleted = () => {
        const collections = this.state.undo.data.slice();
        this._addManyCollections_async(collections);
        this._setManyCollections(collections);
        // this._setManyMembers(collections);
    }
    // _undoManyCollectionsRemoved = () => {
    //     const collections = this.state.undo.data.slice();
    //     const members = [];
    //     collections.forEach(collection => {
    //         members.push(collection.id);
    //         this.props.updateDeck_async(this.props.select_token, collection);
    //     });
    //     this.props.updateDeck_async(this.props.select_token, {
    //         ...this.state.deck,
    //         member: this.state.deck.member.concat(members)
    //     });
    //     this._setManyCollections(collections);
    //     this._setManyMembers(collections);
    // }
    _undoCollectionUpdated = () => {
        const collection = this.state.undo.data;
        this.props.updateDeck_async(this.props.token, collection);
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
                    this.props.updateDeck_async(this.props.token, data);
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
    handle_onActionToggle = (action) => {
        switch (action) {
            case 0:
                this._deleteManyCollections();
                break;
            case 1:
                this._cloneManyCollections();
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

    // selectCollection (collection) {
    //     switch (collection) {
    //         case 'deck':
    //             return this.props.select_decks;
    //         case 'deck':
    //             return this.props.select_decks;
    //         default:
    //             break;
    //     }
    // }

    // componentDidUpdate (prevProps, prevState) {
    //     if (prevProps.match.params.collection !== this.props.match.params.collection) {
    //         this.setState(prev => ({
    //             ...prev,
    //             collection: this.selectCollection(this.props.match.params.collection),
    //             page: this.props.match.params.collection
    //         }));
    //     }
    // }

    // //  Quicks  ------------------------------------------------------------  Quicks //
    // clearQuick (value) {
    //     this.setState(prev => ({
    //         ...prev,
    //         quick: prev.quick.filter(q => q !== value)
    //     }))
    // }
    // setQuick (value) {
    //     if (!this.state.quick.includes(value)) {
    //         this.setState(prev => ({
    //             ...prev,
    //             quick: prev.quick.concat(value)
    //         }));
    //     }
    // }

    // //  Aside  -------------------------------------------------------------  Aside  //
    // clearAside () {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             actions: {},
    //             data: {},
    //             state: 0
    //         }
    //     }));
    // }
    // setAsideData (data) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...data
    //             }
    //         }
    //     }));
    // }
    // updateAsideData (property, data) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             data: {
    //                 ...prev.aside.data,
    //                 [property]: data
    //             }
    //         }
    //     }));
    // }
    // setAsideActions (actions) {
    //     this.setState(prev => ({
    //         ...prev,
    //         aside: {
    //             ...prev.aside,
    //             actions: {
    //                 ...actions
    //             }
    //         }
    //     }));
    // }
    // toggleAside (state) {
    //     if (this.state.aside.state) {
    //         if (state !== this.state.aside.state && this.state.aside.isActive) {
    //             this.setState(prev => ({
    //                 ...prev,
    //                 aside: {
    //                     ...prev.aside,
    //                     state: state
    //                 }
    //             }));
    //         } else {
    //             this.setState(prev => ({
    //                 ...prev,
    //                 aside: {
    //                     ...prev.aside,
    //                     isActive: 0
    //                 }
    //             }));
    //         }
    //     } else {
    //         this.setState(prev => ({
    //             ...prev,
    //             aside: {
    //                 ...prev.aside,
    //                 state: state
    //             }
    //         }));
    //     }
    // }
 
    // //  Undo  --------------------------------------------------------------  Undo  //
    // clearUndo () {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: {
    //             action: null,
    //             data: {}
    //         }
    //     }));
    // }
    // setUndo (data) {
    //     this.setState(prev => ({
    //         ...prev,
    //         undo: {
    //             ...data
    //         }
    //     }));
    // }

    // //  Collections  -------------------------------------------------  Collections  //
    // addCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             [collection.id]: collection
    //         }
    //     }));
    // }
    // removeCollection (collection) {
    //     const collection = this.state.collection;
    //     delete collection[collection.id];
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...collection
    //         }
    //     }));
    // }
    // resetCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection
    //     }));
    // }
    // setCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             [collection.id]: {...collection}
    //         }
    //     }));
    // }
    // setManyCollections (collections) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             ...collections
    //         }
    //     }));
    // }
    // setCollectionValue (collection, target, value) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: {
    //             ...prev.collection,
    //             [collection.id]: {
    //                 ...prev.collection[collection.id],
    //                 [target]: value
    //             }
    //         }
    //     }));
    // }

    // //  Inspected  -----------------------------------------------------  Inspected  //
    // setInspected (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         inspected: collection
    //     }));
    // }

    // //  Lists  -------------------------------------------------------------  Lists  //
    // clearSelected (collection) {
    //     if (typeof collection === 'undefined') {
    //         this.setState(prev => ({
    //             ...prev,
    //             selected: []
    //         }));
    //     } else {
    //         this.setState(prev => ({
    //             ...prev,
    //             selected: [collection]
    //         }));
    //     }
    // }
    // setSelected (selected) {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: selected
    //     }));
    // }

    // //  Filters  ---------------------------------------------------------  Filters  //
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
    //             group: [],
    //             tag: []
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

    // //  Tags  ---------------------------------------------------------------  Tags  //
    // setTags (category, tag) {
    //     this.setState(prev => ({
    //         ...prev,
    //         [category]: tag
    //     }));
    // }

    // //  Tabs  ---------------------------------------------------------------  Tabs  //
    // addTab (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         tab: {
    //             ...prev.tab,
    //             [tab.id]: tab
    //         }
    //     }));
    // }
    // setCollection (collection) {
    //     this.setState(prev => ({
    //         ...prev,
    //         collection: collection
    //     }));
    // }
    // setCurrent (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         current: tab
    //     }));
    // }
    // resetTabs (tab) {
    //     this.setState(prev => ({
    //         ...prev,
    //         tab: {
    //             ...tab
    //         }
    //     }));
    // }

    // //  Sort  ---------------------------------------------------------------  Sort  //
    // setSort (sort) {
    //     this.setState(prev => ({
    //         ...prev,
    //         sort: sort
    //     }));
    // }

    // //  Action  -----------------------------------------------------------  Action  //
    // handle_onActionClick = () => {
    //     const collection = create.deckViewModel(utility.createHashId(0), {
    //         owner: this.props.select_user.id
    //     });
    //     this.addCollection(collection);
    //     this.toggleAside(98);
    //     this.setAsideData({
    //         group: this.state.group,
    //         collection: collection,
    //         tag: this.state.tag
    //     });
    //     this.setAsideActions({change: this.handle_onCollectionChange});
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }


    // //  Aside  -------------------------------------------------------------  Aside  //
    // handle_onInspectOut = () => {
    //     const original = this.state.aside.data.collection;
    //     const collection = this.state.collection[original.id];
    //     if (JSON.stringify(collection) !== JSON.stringify(original)) {
    //         this._checkForNewTags('tag', collection.tag);
    //         this._checkForNewTags('group', collection.group);
    //         switch (this.state.aside.state) {
    //             case 98:
    //                 this.props.addDeck_async(this.props.token, collection);
    //                 break;
    //             case 99:
    //                 this.props.updateDeck_async(this.state.page, this.props.token, collection);
    //                 this.setQuick('u');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } else if (this.state.aside.state === 98) {
    //         this.removeCollection(collection);
    //     }
    // }
    // handle_onAsideClose = () => {
    //     if (this.state.aside.state >= 98) {
    //         this.handle_onInspectOut();
    //     }
    //     this.clearAside();
    // }
    
    // handle_onFilterSelect = (category, tag) => {
    //     const filters = {...this.state.filters};
    //     if (filters[category].includes(tag)) {
    //         filters[category] = filters[category].filter(t => t !== tag);
    //     } else {
    //         filters[category] = filters[category].concat(tag);
    //     }
    //     this.setFilters(category, filters);
    //     this.updateAsideData('filters', filters);
    //     if (filters.tag.length || filters.group.length) {
    //         this.setQuick('f');
    //     } else {
    //         this.clearQuick('f');
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
    //                 group: this.state.group,
    //                 tag: this.state.tag
    //             });
    //         }
    //         this.toggleAside(state);
    //     } else {
    //         this.handle_onAsideClose();
    //     }
    // }

    // handle_onCollectionChange = (collection, payload) => {
    //     this.setCollectionValue(collection, payload.target, payload.value);
    // }
    // handle_onCollectionInspect = (collection) => {
    //     this.toggleAside(99);
    //     this.setAsideData({
    //         group: this.state.group,
    //         collection: collection,
    //         tag: this.state.tag
    //     });
    //     this.setAsideActions({change: this.handle_onCollectionChange});
    //     this.setUndo({
    //         action: this.handle_onCollectionReset,
    //         data: collection
    //     });
    //     this.clearQuick('s');
    // }
    // handle_onCollectionSelect = (collection) => {
    //     let selected = this.state.selected.slice();
    //     if (selected.find(i => i.id === collection.id)) {
    //         selected = selected.filter(i => i.id !== collection.id);
    //     } else {
    //         selected = selected.concat(collection);
    //     }
    //     if (selected.length) {
    //         this.setQuick('s');
    //     } else {
    //         this.clearQuick('s');
    //     }
    //     if (this.state.aside.state === 99) {
    //         this.handle_onAsideClose();
    //     }
    //     this.setSelected(selected);
    // }

    // _checkForNewTags (category, tag) {
    //     const newTags = tag.filter(tag => this.state[category].indexOf(tag) < 0);
    //     let allTags;
    //     if (newTags.length) {
    //         allTags = this.state[category].concat(newTags);
    //         this.setTags(category, allTags);
    //         this.props.putTag_async(category, this.props.token, this.props.user.id, allTags);
    //     }
    // }
    // _findTheNextTab (tab) {
    //     const tabs = utility.sortBy(sortTypes.DATE_DSC, this.state.tab).filter(tab => tab.collection === this.state.page);
    //     return tabs[tabs.indexOf(tab) + 1];
    // }


    // //  EVENT HANDLERS  //
    // //  Collections  ---------------------------------------------  Collections EHs  //
    // handle_onCollectionSort = (sort) => {
    //     this.setSort(sort);
    // }
    // handle_onCollectionsCreate = (collections) => {
    //     const created = {};
    //     collections.forEach(collection => {
    //         created[collection.id] = collection;
    //     });
    //     this.setManyCollections(created);
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }
    // handle_onCollectionsDelete = () => {
    //     const collection = this.state.collection;
    //     this.state.selected.slice().forEach(collection => {
    //         delete collection[collection.id];
    //     });
    //     this.setUndo({
    //         action: this.handle_onCollectionsRecover,
    //         data: this.state.selected.slice()
    //     });
    //     this.setQuick('u');
    //     this.resetCollection(collection);
    //     this.clearQuick('s');
    //     this.clearSelected();
    // }
    // handle_onCollectionsRecover = () => {
    //     const deleted = this.state.undo.data;
    //     const recovered = {}
    //     deleted.map(collection => {
    //         recovered[collection.id] = collection
    //     });
    //     this.setManyCollections(recovered);
    //     this.clearQuick('u');
    //     this.clearUndo();
    //     this.props.addManyDecks_async(this.props.select_token, deleted);
    // }
    // handle_onCollectionReset = () => {
    //     const collection = this.state.undo.data;
    //     this.setCollection(collection);
    //     this.clearQuick('u');
    //     this.clearUndo();
    //     this.props.addDeck_async(this.props.select_token, collection);
    // }
    
    // //  Filters  -----------------------------------------------------  Filters EHs  //
    // handle_onFilterClear = () => {
    //     this.clearFilters();
    //     this.clearQuick('f');
    //     this.updateAsideData('filters', {
    //         group: [],
    //         tag:[]
    //     });
    // }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    // handle_onMainClick = () => {
    //     this.handle_onAsideClose();
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }

    // //  Selected  ---------------------------------------------------  Selected EHs  //
    // handle_onCollectionSelectClear = (collection) => {
    //     this.clearSelected(collection);
    //     this.clearQuick('s');
    // }

    // //  Tab  -------------------------------------------------------------  Tab EHs  //
    // handle_onTabDelete = (tab) => {
    //     let tabs = this.state.tab;
    //     if (this.state.current.id === tab.id) {
    //         this.handle_onTabToggle(this._findTheNextTab(tabs));
    //     }
    //     delete tab[tab.id];
    //     this.resetTabs(tabs);
    // }
    // handle_onTabToggle = (tab) => {
    //     this.setCurrent(tab);
    //     if (this.state.aside.state && this.state.aside.state === 2 || this.state.aside.state === 3) {
    //         this.updateAsideData('current', tab);
    //     }
    //     this.clearSelected();
    //     this.clearQuick('s');
    // }
    // handle_onTabCreate = (tab) => {
    //     this._checkForNewTags('group', tab.group);
    //     this._checkForNewTags('tag', tab.tag);
    //     this.addTab(tab);
    //     this.handle_onTabToggle(tab);
    // }


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
        );
    }
}

const mapStateToProps = state => {
    return {
        select_decks: select.decks(state),
        select_decks: select.decks(state),
        select_token: select.authToken(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // addDeck_async: (url, token, collection) => dispatch(actions.addDeck_async(url, token, collection)),
        addDeck_async: (token, deck) => dispatch(actions.addDeck_async(token, deck)),
        addManyDecks_async: (token, decks) => dispatch(actions.addManyDecks_async(token, decks)),
        updateDeck_async: (token, collection) => dispatch(actions.updateDeck_async(token, collection)),
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
        patchTab_async: (token, user, data) => dispatch(actions.patchTab_async(token, user, data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Collections));