import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List2 from '../../components/List/List2';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './User.module.css';

class User extends Component {
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
        users: {},
        filter: {
            group: [],
            tag: []
        },
        group: [],
        main: 'LOADING',
        quick: [],
        selected: [],
        sort: sortTypes.DATE_ASC,
        tab: {},
        tag: [],
        undo: {
            action: null,
            data: {}
        },
    }
    undoTimeout = null;

    componentDidMount () {
        const models = this.props.select_users;
        const users = {};
        Object.keys(models).forEach(id => {
            users[id] = models[id];
        });
        this.setState(prev => ({
            ...prev,
            group: this.props.select_user.group.slice(),
            users: users,
            main: 'LIST_VIEW',
            tab: this.props.select_user.user || {},
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

    //  Users  ----------------------------------------------------------  Users SS  //
    _removeManyUsers (users) {
        const i = this.state.users;
        users.forEach(user => {
            delete i[user.id];
        });
        this.setState(prev => ({
            ...prev,
            users: i
        }));
    }
    _setManyUsers (users) {
        const i = this.state.users;
        users.forEach(user => {
            i[user.id] = user;
        });
        this.setState(prev => ({
            ...prev,
            users: i
        }));
    }
    _setUserValue (target, value) {
        const id = this.state.aside.data.user.id;
        this.setState(prev => ({
            ...prev,
            users: {
                ...prev.users,
                [id]: {
                    ...prev.users[id],
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
    _openAssignAside (data) {
        const collections = this.props.select_collections;
        const all = [];
        const member = [];
        Object.keys(collections).map(id => {
            all.push({
                id: id,
                primary: collections[id].primary
            });
            if (data.user.member.includes(id)) {
                member.push(id);
            }
        });
        this._toggleAside(data.type);
        this._setAside({
            cancel: this.handle_onAsideCancel,
            change: this.handle_onUserChange,
            confirm: data.confirm,
        }, {
            all: all,
            user: data.user,
            member: member,
        });
    }
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
            change: this.handle_onUserChange,
            confirm: data.confirm,
            create: this.handle_onTagCreate
        }, {
            group: this.state.group,
            user: data.user,
            tag: this.state.tag
        });
    }

    //  Users  ----------------------------------------------------------  Users PM  //
    _addManyUsers = (users) => {
        this._addManyUsers_async(users);
        this._clearAndCloseAside();
    }
    _addManyUsers_async (users) {
        this.props.addMany_async(this.props.match.params.user, this.props.select_authToken, users);
    }
    _checkUser (user) {
        let valid = true;
        if (!user.primary.length > 0 && valid) {
            valid = false;
        }
        if (!user.secondary.length && valid) {
            valid = false
        }
        return valid;
    }
    _cloneManyUsers () {
        const cloned = [];
        const selected = this.state.selected.slice();
        selected.forEach((user, i) => {
            let primary;
            if (user.primary.length <= 24) {
                primary = 'Copy of ' + user.primary;
            } else {
                primary = 'Copy of ' + user.primary.substr(0, 21) + '...';
            }
            switch (this.page) {
                case 'card':
                        cloned.push(create.userViewModel(utility.createHashId(i), {
                            ...user,
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
        this._addManyUsers_async(cloned);
        this._setManyUsers(cloned);
        this._clearSelected();
    }
    _createUser () {
        const user = create.userViewModel(utility.createHashId(0), {
            owner: this.props.select_authUser,
            primary: '',
            secondary: '',
            tag: []
        });
        
        this._setManyUsers([user]);
        this._openInspectAside({
            confirm: () => this._addManyUsers([this.state.users[user.id]]),
            user: user,
            type: asideTypes.CREATE_USER
        });
        this._clearSelected();
    }
    _deleteManyUsers () {
        const i = this.state.users;
        const selected = this.state.selected.slice();
        selected.forEach(user => {
            delete i[user.id];
            this.props.delete_async(this.props.match.params.user, this.props.select_authToken, user);
        });
        this._setManyUsers(i);
        this._setUndo({
            action: this._undoManyUsersDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteUser = (user) => {
        this.props.delete_async(this.props.match.params.user, this.props.select_authToken, user);
        this._removeManyUsers([user]);
        this._setUndo({
            action: this._undoManyUsersDeleted,
            data: [user]
        });
        this._clearSelected();
    }
    _inspectUser = (user) => {
        this._openInspectAside({
            confirm: this._updateUser,
            user: user,
            type: asideTypes.INSPECT_USER
        });
        this._clearQuick('s');
    }
    _selectUser = (user) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === user.id)) {
            selected = selected.filter(i => i.id !== user.id);
        } else {
            selected = selected.concat(user);
        }
        if (this.state.aside.state === asideTypes.CREATE_USER || this.state.aside.state === asideTypes.INSPECT_USER) {
            this.handle_onAsideClose();
        }
        this._setSelected(selected);
    }
    _updateUser = () => {
        const original = this.state.aside.data.user;
        const user = this.state.users[original.id];
        if (JSON.stringify(user) !== JSON.stringify(original)) {
            this.props.update_async(this.props.match.params.user, this.props.select_authToken, user);
            this._setUndo({
                action: this._undoUserUpdated,
                data: original
            });
        }
        this._clearAndCloseAside();
    }

    //  Tab  ------------------------------------------------------------------ Tab  //
    _deleteTab (tab) {
        let tabs = {...this.state.tab};
        delete tabs[tab.id];
        this.props.deleteTab_async('user', 'user', this.props.select_authToken, this.props.select_authUser, tab);
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
    _undoManyUsersDeleted = () => {
        const users = this.state.undo.data.slice();
        this._addManyUsers_async(users);
        this._setManyUsers(users);
    }
    _undoManyUsersRemoved = () => {
        const users = this.state.undo.data.slice();
        const members = [];
        users.forEach(user => {
            members.push(user.id);
            this.props.update_async(this.props.match.params.user, this.props.select_authToken, user);
        });
        this._setManyUsers(users);
    }
    _undoUserUpdated = () => {
        const user = this.state.undo.data;
        this.props.update_async(this.props.match.params.user, this.props.select_authToken, user);
        this._setManyUsers([user]);
    }
    

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Aside  ----------------------------------------------------------  Aside EH  //
    handle_onAsideCancel = () => {
        const originalData = this.state.aside.data;
        let data;
        switch (this.state.aside.state) {
            case asideTypes.CREATE_USER:
                this._removeManyUsers([this.state.users[this.state.aside.data.user.id]]);
                break;
            case asideTypes.INSPECT_USER:
                data = this.state.users[originalData.user.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.user) && this._checkUser(data)) {
                    this._setManyUsers([originalData.user]);
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
            case asideTypes.CREATE_USER:
                data = this.state.users[originalData.user.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.user) && this._checkUser(data)) {
                    this._addManyUsers([data]);
                } else {
                    this._removeManyUsers([data]);
                }
                break;
            case asideTypes.INSPECT_USER:
                data = this.state.users[originalData.user.id];
                if (JSON.stringify(data) !== JSON.stringify(originalData.user) && this._checkUser(data)) {
                    this.props.update_async(this.props.match.params.user, this.props.select_authToken, data);
                    this._setUndo({
                        action: this._undoUserUpdated,
                        data: originalData.user
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
                this._deleteManyUsers();
                break;
            case 1:
                this._cloneManyUsers();
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
    
    //  User  ------------------------------------------------------------  User EH  //
    handle_onUserChange = (target, value) => {
        this._setUserValue(target, value);
    }

    //  List  ------------------------------------------------------------  List EH  //
    handle_onListClick = (action, data) => {
        switch (action) {
            case 0:
                this._selectUser(data);
                break;
            case 1:
                this.props.history.replace('/2/user/' + data.id);
                break;
            case 2:
                //  Suspend user
                // this._assignUser(data);
                break;
            case 3:
                //  Delete User
                // this._deleteUser(data);
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
        this.props.addTab_async('user', 'user', this.props.select_authToken, this.props.select_authUser, tab);
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
                        collection={utility.sortBy(this.state.sort, this.state.users)}
                        filters={this.state.filter}
                        current={this.state.current}
                        selected={this.state.selected}
                        aux={'suspend'}/>
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
                        <QuickBar
                            action={this.handle_onQuickClick}
                            data={this.state.quick}/>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    data={this.state.aside.data}
                    page={this.props.match.params.user}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_users: select.users(state, ownProps.match.params.user),
        select_user: select.user(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addMany_async: (store, token, users) => dispatch(actions.addMany_async(store, token, users)),
        addTab_async: (store, collection, token, user, model) => dispatch(actions.addTab_async(store, collection, token, user, model)),
        delete_async: (store, token, user) => dispatch(actions.delete_async(store, token, user)),
        deleteTab_async: (store, collection, token, user, tab) => dispatch(actions.deleteTab_async(store, collection, token, user, tab)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);