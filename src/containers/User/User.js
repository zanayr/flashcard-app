import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types';
import * as select from '../../store/reducers/root';
import * as sortTypes from '../../utility/sortTypes';
import * as utility from '../../utility/utility';

import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import QuickBar from '../../components/ui/bar/Quick/QuickBar';
import TabBar from '../../components/ui/bar/Tab/TabBar';
import TabForm from '../../components/form/Tab/TabForm';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from '../Container.module.css';

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
            search: '',
            tag: []
        },
        internal: [],
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

    //  Users  ----------------------------------------------------------  Users SS  //
    _removeManyUsers (users) {
        const u = this.state.users;
        users.forEach(user => {
            delete u[user.id];
        });
        this.setState(prev => ({
            ...prev,
            users: u
        }));
    }
    _setManyUsers (users) {
        const u = this.state.users;
        users.forEach(user => {
            u[user.id] = user;
        });
        this.setState(prev => ({
            ...prev,
            users: u
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
                }, 10000);
            }
            this.setState(prev => ({
                ...prev,
                quick: prev.quick.concat(value)
            }));
        }
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
    

    //  Users  ----------------------------------------------------------  Users PM  //
    _addManyUsers = (users) => {
        this._addManyUsers_async(users);
        this._clearAndCloseAside();
    }
    _addManyUsers_async (users) {
        this.props.addMany_async('user', this.props.select_authToken, users);
    }
    handle_onAsideClose = () => {
        switch (this.state.aside.state) {
            case asideTypes.FILTER:
                this._clearFilter();
                break;
            default:
                break;
        }
        this._clearAndCloseAside();
    }
    _deleteManyUsers () {
        const selected = this.state.selected.slice();
        this.props.deleteMany_async('user', this.props.select_authToken, selected);
        this._removeManyUsers(selected);
        this._setUndo({
            action: this._undoManyUsersDeleted,
            data: selected
        });
        this._clearSelected();
    }
    _deleteUser = () => {
        this._deleteManyUsers();
    }
    _selectUser = (user) => {
        let selected = this.state.selected.slice();
        if (selected.find(i => i.id === user.id)) {
            selected = selected.filter(i => i.id !== user.id);
        } else {
            selected = selected.concat(user);
        }
        this._setSelected(selected);
    }

    //  Tab  ------------------------------------------------------------------ Tab  //

    //  Undo  -----------------------------------------------------------  Undo  PM  //
    _undoManyUsersDeleted = () => {
        const users = this.state.undo.data.slice();
        this._addManyUsers_async(users);
        this._setManyUsers(users);
    }
    

    //  EVENT HANDLERS  ===========================================  EVENT HANDLERS  //
    //  Aside  ----------------------------------------------------------  Aside EH  //
    

    //  Header  --------------------------------------------------------  Header EH  //
    handle_onActionToggle = (action) => {
        switch (action) {
            case 0:
                this._deleteManyUsers();
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
        this._setAside({
            overlay: this.handle_onAsideClose
        });
    }

    //  List  ------------------------------------------------------------  List EH  //
    _suspendUser = (data) => {
        const user = {...data};
        user.suspend = !user.suspend;
        this._setManyUsers([user]);
        this.props.update_async('user', this.props.select_authToken, user);
        this._clearSelected();
    }
    handle_onListClick = (action, data) => {
        switch (action) {
            case 0:
                this._selectUser(data);
                break;
            case 1:
                this.props.history.replace('/2/user/' + data.id);
                break;
            case 2:
                this._suspendUser(data);
                break;
            case 3:
                this._deleteUser();
                break;
            default:
                break;
        }
    }

    // //  Main  -----------------------------------------------------------  Main EHs  //
    handle_onDefaultClick = () => {
        this._clearSelected();
    }

    //  Quicks  ----------------------------------------------------------  Quicks EH  //
    handle_onQuickClick = (quick) => {
        switch (quick) {
            case 0:
                this._updateAsideData('filter', {
                    group: [],
                    search: this.state.filter.search,
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

    setSearch (value) {
        this.setState(prev => ({
            ...prev,
            filter: {
                ...prev.filter,
                search: value.toUpperCase()
            }
        }));
    }
    handle_onSearchChange = (value) => {
        this.setSearch(value);
    }

    render () {
        let content;
        switch (this.state.main) {
            case 'LIST_VIEW':
                content = (
                    <List
                        action={this.handle_onListClick}
                        collection={utility.sortBy(this.state.sort, this.state.users)}
                        default={{primary: 'First Name', secondary: 'Last Name'}}
                        filters={this.state.filter}
                        current={this.state.current}
                        selected={this.state.selected}
                        aux={'suspend'}/>
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
                        search: this.handle_onSearchChange,
                        sort: this.handle_onSortToggle,
                        navigation: this.handle_onNagivationToggle
                    }}
                    selected={this.state.selected}
                    state={headerTypes.USER}
                    onClick={this.handle_onAsideClose}/>
                <main
                    className={[styles.List, styles.NoTab].join(' ')}
                    onClick={this.handle_onDefaultClick}>
                    <div>
                        {content}
                        <QuickBar
                            action={this.handle_onQuickClick}
                            data={this.state.quick}/>
                    </div>
                </main>
                <Aside2
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
        deleteMany_async: (store, token, models) => dispatch(actions.deleteMany_async(store, token, models)),
        deleteTab_async: (store, collection, token, user, tab) => dispatch(actions.deleteTab_async(store, collection, token, user, tab)),
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);