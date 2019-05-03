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
        history: {
            data: {},
            action: null
        },
        selected: [],
        tabs: this.props.user.tabs,
        tags: this.props.user.tags
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
    closeAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                isActive: false
            }
        }));
    }

    //  List  ---------------------------------------------------------------  List  //
    addSelectedID (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(id)
        }));
    }
    // clearSelected (id) {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: []
    //     }));
    // }
    removeSelectedID (id) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.filter(i => i !== id)
        }));
    }
    // setConfirm (bool) {
    //     this.setState(prev => ({
    //         ...prev,
    //         confirm: bool
    //     }));
    // }

    //  Closes any open confrim context action button
    closeConfirmCA () {
        this.setState(prev => ({
            ...prev,
            confirm: false
        }));
    }
    toggleConfirm () {
        this.setState(prev => ({
            ...prev,
            confirm: !prev.confirm
        }));
    }

    createItem (item) {
        this.setState(prev => ({
            ...prev,
            [this.state.current]: prev[this.state.current].concat(item)
        }));
    }
    removeItem (item) {
        this.setState(prev => ({
            ...prev,
            [this.state.current]: prev[this.state.current].filter(i => i.id !== item.id)
        }));
    }
    updateItem (id, target, value) {
        this.setState(prev => ({
            ...prev,
            [this.state.state]: {
                ...prev[this.state.state],
                [id]: {
                    ...prev[this.state.state][id],
                    [target]: value
                }
            }
        }));
    }
    getItemById (id) {
        return {
            ...this.state.decks[id],
            id: id
        }
    }
 
    resetItem = () => {
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,
                [this.state.history.last.id]: {
                    ...this.state.history.last
                }
            }
        }));
    }
    setHistory (data) {
        this.setState(prev => ({
            ...prev,
            history: {
                ...data
            }
        }));
    }
    toggleTabs (tab) {
        const tabs = this.state.tabs;
        Object.keys(tabs).forEach(t => {
            if (t === tab) {
                tabs[t].isActive = true;
            } else if (tabs[t].isActive) {
                tabs[t].isActive = false;
            }
        });
        this.setState(prev => ({
            ...prev,
            tabs: {
                ...tabs
            }
        }));
    }

    //  EVENT HANDLERS v2  //
    onActionClick = () => {
        let id = utility.createHashId(0);
        let item;
        if (this.state.current === 'deck') {
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
        this.createItem(create.itemModel(id, item));
        this.props.patchItem_async(this.state.current, this.props.token, id, item);
    }






    // //  (1) Should return a matching item from the allItems object
    // getItemById2 (id) {
    //     return {
    //         ...this.state.allItems.find(i => i.id == id)
    //     }
    // }
    // //  (1) Should add a selected list item to the selected items array
    // addSelected (item) {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: prev.selected.concat(item)
    //     }));
    // }
    // //  (1) Should remove a selected lsit item from the selected items array
    // removeSelected (item) {
    //     this.setState(prev => ({
    //         ...prev,
    //         selected: prev.selected.filter(i => i.id !== item.id)
    //     }));
    // }
    // //  (1) Should close any item that has it's confirm context action button open,
    // //  (2) add or remove it from the selected items array and (3) check to see if the
    // //  quick inspect aside is open
    // handle_listItemSelect = id => {
    //     this.closeConfirmCA(false);
    //     if (this.state.selected.find(i => i.id === id)) {
    //         this.removeSelected(this.getItemById2(id));
    //     } else {
    //         this.addSelected(this.getItemById2(id));
    //     }
    //     if (this.state.aside.isActive && this.state.aside.state === 99) {
    //         this.closeAside();
    //     }
    // }



    //  Aside  -------------------------------------------------------------  Aside  //
    handle_onAsideClose = state => {
        if (this.state.aside.state === 99) {
            this.state.history.undo();
            //this.setAsideState(0);
        }
        this.closeAside();
    }
    handle_onAsideToggle = state => {
        this.toggleAside(state);
    }

    //  List  ---------------------------------------------------------------  List  //
    onListOut = () => {
        if (this.state.aside.isActive) {
            this.closeAside();
        }
    }
    // onItemDelete = id => {
    //     //this.removeSelectedID(id);
    //     this.removeItem(id);
    //     this.props.delete_async(this.state.state, this.props.select_token, id);
    // }

    //  Check for new user tags and groups
    checkForNew (category, arr) {
        let filters = this.state.user[category].concat(arr.filter(f => this.state.user[category].indexOf(f) < 0))
        this.setState(prev => ({
            ...prev,
            user: {
                ...prev.user,
                [category]: filters
            }
        }));
        this.props.putUserFilter_async(category, this.props.select_token, this.state.user.id, filters);
    }
    onItemUpdate = () => {
        let item = this.getItemById(this.state.aside.data.id);
        this.closeAside();
        this.checkForNew('tags', item.tags);
        this.checkForNew('groups', item.groups);
        this.props.put_async(this.state.state, this.props.select_token, item);
    }
    onItemFilterAdd = (filter, name) => {
        let id = this.state.aside.data.id;
        let current = this.state.state;
        this.setState(prev => ({
            ...prev,
            [current]: {
                ...prev[current],
                [id]: {
                    ...prev[current][id],
                    [filter]: prev[current][id][filter].concat(name)
                }
            }
        }));
    }
    onItemFilterRemove = (filter, name) => {
        let id = this.state.aside.data.id;
        let current = this.state.state;
        this.setState(prev => ({
            ...prev,
            [current]: {
                ...prev[current],
                [id]: {
                    ...prev[current][id],
                    [filter]: prev[current][id][filter].filter(n => n !== name)
                }
            }
        }));
    }
    onItemChange = (target, value) => {
        this.updateItem(this.state.aside.data.id, target, value);
    }
    onItemInspect = id => {
        this.toggleAside(99);
        this.setAsideData({
            ...this.getItemById(id),
            userTags: this.state.user.tags,
            userGroups: this.state.user.groups
        });
        this.setHistory({
            last: this.getItemById(id),
            undo: this.resetItem
        });
        this.setAsideAction({
            onChange: this.onItemChange,
            onConfirm: this.onItemUpdate,
            onAdd: this.onItemFilterAdd,
            onRemove: this.onItemFilterRemove
        });
    }
    onItemSelect = (item) => {
        //  1.  Toggle the item that was just selected
        //  2.  Count the number of selected items
        //  3.  If the item is selected and the total number of selected items is one,
        //      make the item as active and show the context actions
        //  4.  Set the state and check if the item was clicked on while the quick
        //      inspect aside was open, shut it if it was
        item.isSelected = !item.isSelected;
        let selected = 0;
        this.state[item.type].forEach(i => {
            if (i.isSelected) {
                selected++;
            }
        });
        item.isActive = selected === 1 && item.isSelected;
        this.setState(prev => ({
            ...prev,
            [item.type]: this.state[item.type].filter(i => i.id !== item.id).concat(item)
        }));
        if (this.state.aside.isActive && this.state.aside.state === 99) {
            this.closeAside();
        }
    }

    handle_onTabCreate = (tab) => {
        //  1.  Create a unique id for the tab
        //  2.  Build the tab object
        //  3.  Set the state and update the db
        const id = utility.createHashId(0);
        let newTab = {
            ...tab,
            collection: tab.collection.substr(0, tab.collection.length - 1),
            date: Date.now()
        }

        this.setState(prev => ({
            ...prev,
            current: id,
            filters: {
                groups: newTab.groups,
                tags: newTab.tags
            },
            tabs: {
                ...prev.tabs,
                [id]: newTab
            }
        }));
        this.props.patchTab_async(this.props.token, this.props.user.id, id, newTab);
    }
    handle_onTabAdd = () => {
        this.setState(prev => ({
            ...prev,
            current: 'add'
        }));
    }
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

    handle_onItemDelete = item => {
        // this.removeSelectedID(item);
        this.removeItem(item);
        this.props.deleteItem_async(this.state.current, this.props.token, item.id);
    }

    toggleFilter = (category, filter) => {
        if (this.state.filters[category].indexOf(filter) > -1) {
            this.setState(prev => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    [category]: prev.filters[category].filter(f => f !== filter)
                }
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    [category]: prev.filters[category].concat(filter)
                }
            }));
        }
    }

    handle_onFilterOpen = category => {
        this.setAsideData({
            filters: this.state.user[category],
            category: category
        });
        this.setAsideAction({
            onToggle: this.toggleFilter,
        });
        if (category === 'tags') {
            this.toggleAside(2);
        } else {
            this.toggleAside(3);
        }
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let mainContent = null;
        if (this.state.tabs[this.state.current]) {
            let tab = this.state.tabs[this.state.current];
            mainContent = (
                <List
                    backingCollection={this.state[tab.collection]}
                    filters={this.state.filters}
                    onConfirm={this.handle_onItemDelete}
                    onInspect={this.onItemInspect}
                    onSelect={this.onItemSelect}/>
            );
        } else {
            mainContent = (
                <TabForm
                    data={{
                        userTags: this.state.tags,
                        userGroups: this.state.groups
                    }}
                    onConfirm={this.handle_onTabCreate}/>
            );
        }
        return (
            <Aux>
                <Header
                    actions={{
                        deleteItem: this.handle_onItemDelete,
                        openFilter: this.handle_onFilterOpen,
                        toggleAside: this.handle_onAsideToggle,
                        closeAside: this.handle_onAsideClose
                    }}
                    collection={this.state[this.state.state]}
                    selected={this.state.selected}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.onListOut}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        <TabBar
                            actions={{
                                add: this.handle_onTabAdd,
                                click: this.handle_onTabBarClick,
                                close: this.handle_onTabRemove,
                                toggle: this.handle_onTabToggle,
                            }}
                            backingCollection={this.state.tabs}
                            current={this.state.current}/>
                        {mainContent}
                        <ActionButton
                            onClick={this.onActionClick}
                            state={0}
                            values={['Create', 'Study']}/>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    active={this.state.aside.isActive}
                    data={this.state.aside.data}
                    onClose={this.handle_onAsideClose}
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
        deleteItem_async: (url, token, id) => dispatch(actions.deleteItem_async(url, token, id)),
        deleteTab_async: (token, user, id) => dispatch(actions.deleteTab_async(token, user, id)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        patchItem_async: (url, token, id, data) => dispatch(actions.patchItem_async(url, token, id, data)),
        putUserFilter_async: (url, token, user, data) => dispatch(actions.putUserFilter_async(url, token, user, data)),
        patchTab_async: (token, user, id, data) => dispatch(actions.patchTab_async(token, user, id, data)),
        put_async: (url, token, data) => dispatch(actions.put_async(url, token, data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Collections));