import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {select_isLoading} from '../../store/reducers/root';
import * as utility from '../../utility';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import Throbber from '../../components/ui/Throbber/Throbber';
import List from '../../components/List/List';
import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';

import AppCSS from '../../App.module.css';
import CollectionsCSS from './Collections.module.css';

class Collections extends Component {
    state = {
        action: {
            state: 0
        },
        aside: {
            actions: {},
            data: {},
            isActive: false,
            state: 0
        },
        deleted: [],
        history: {
            store: {},
            undo: null
        },
        selected: [],
        state: 'decks'
    }

    componentDidMount () {
        this.props.get_async(this.state.state, this.props.token, this.props.user);
    }

    startSession () {
        console.log('Start a session...');
    }
    createCollection () {
        this.props.post_async(this.state.state, this.props.token, {
            details: 'This is a new flashcard deck',
            title: utility.createHashId() + ' New Flashcard Deck',
            userId: this.props.user
        });
    }


    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    //  Aside  -----------------------------------------------------  Aside Setters  //
    set_onAsideClose () {
        this.setState(previous => ({
            ...previous,
            aside: {
                ...previous.aside,
                actions: {},
                data: {}
            }
        }));
    }
    set_onAsideOpen (payload) {
        this.setState(previous => ({
            ...previous,
            aside: {
                ...previous.aside,
                actions: payload.actions ? payload.actions : {},
                data: payload.data ? payload.data : {},
            }
        }));
    }
    set_onAsideStateChange (state) {
        this.setState(previous => ({
            ...previous,
            aside: {
                ...previous.aside,
                state: state
            }
        }));
    }
    set_onAsideToggle () {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                isActive: !previousState.aside.isActive
            }
        }));
    }
    set_onQuickInspectChange (payload) {
        this.setState(previous => ({
            ...previous,
            aside: {
                ...previous.aside,
                data: {
                    ...previous.aside.data,
                    [payload.target]: payload.value
                }
            }
        }))
    }

    //  List  -------------------------------------------------------- List Setters  //
    set_onItemDelete (payload) {
        this.setState(previous => ({
            ...previous,
            deleted: [
                ...previous.deleted,
                payload.key
            ]
        }));
    }
    set_onItemDeselect (payload) {
        this.setState(previous => ({
            ...previous,
            selected: previous.selected.filter(key => key !== payload.key)
        }));
    }
    set_onItemSelect (payload) {
        this.setState(previous => ({
            ...previous,
            selected: [
                ...previous.selected,
                payload.key
            ]
        }));
    }

    //  History  -------------------------------------------------- History Setters  //
    set_onHistoryChange (store, undo) {
        this.setState(previous => ({
            ...previous,
            history: {
                store: {
                    ...store
                },
                undo: undo
            }
        }));
    }


    //  EVENT HANDLERS  --------------------------------------------  EVENT HANDERS  //
    //  History  -----------------------------------------------------  History EHs  //
    handle_onHistoryUndo = () => {
        this.state.history.undo(this.state.history.store);
    }

    //  Aside  ---------------------------------------------------------  Aside EHs  //
    handle_onAsideClose = () => {
        if (this.state.aside.isActive) {
            this.set_onAsideClose();
            this.set_onAsideToggle();
            if (this.state.aside.state === 99) {
                this.set_onAsideStateChange(0);
                this.handle_onHistoryUndo();
            }
        }
    }
    handle_onAsideConfirm = () => {
        this.set_onAsideToggle();
        this.set_onAsideClose();
    }
    handle_onAsideToggle = (payload) => {
        if (this.state.aside.isActive) {
            if (this.state.aside.state === payload.state) {
                this.set_onAsideToggle();
            } else {
                this.set_onAsideOpen(payload);
            }
        } else {
            this.set_onAsideToggle();
            this.set_onAsideOpen(payload);
        }
    }


    //  List  -----------------------------------------------------------  List EHs  //
    handle_onItemDelete = (payload) => {
        const modal = {
            actions: {
                ...payload.actions,
                onConfirm: (deletePayload) => {
                    this.set_onItemDelete(deletePayload);
                    this.set_onItemDeselect(deletePayload);
                    this.props.delete_async(this.state.state, this.props.token, payload.key);
                }
            },
            data: {
                cancel: 'Cancel',
                confirm: 'Delete',
                details: [payload.data.details],
                key: payload.key,
                message: 'Once you delete a item it cannot be recovered. Are you sure you wish to delete the following items?',
                title: 'Warning',
                type: 1,
            }
        }
        this.props.createDeleteModal_sync(modal);
    }
    handle_onItemEdit = (payload) => {
        const aside = {
            actions: {
                ...payload.actions,
                onConfirm: (putPayload) => {
                    this.handle_onAsideConfirm();
                    this.props.put_async(this.state.state, this.props.token, this.state.aside.data.key, {
                        ...putPayload.data,
                        userId: this.props.user
                    });
                }
            },
            data: {
                ...payload.data,
                key: payload.key,
                user: this.props.user
            }
        }
        this.set_onHistoryChange(aside, payload.actions.onCancel);
        this.set_onAsideOpen(aside);
        this.set_onAsideStateChange(99);
        this.set_onAsideToggle();
    }
    handle_onItemSelect = (payload) => {
        if (this.state.selected.indexOf(payload.key) > -1) {
            this.set_onItemDeselect(payload);
        } else {
            this.set_onItemSelect(payload);
        }
        if (this.state.aside.isActive && this.state.aside.state === 99) {
            this.set_onAsideStateChange(0);
            this.set_onAsideToggle();
            if (this.state.history.undo) {
                this.handle_onHistoryUndo();
            }
        }
    }
    handle_onListOut = () => {
        if (this.state.selected.length) {
            //  Deselect all items
            this.state.selected.forEach(key => {
                this.set_onItemDeselect({key: key})
            });
        }
        if (this.state.aside.isActive) {
            //  Close the aside if it is open
            this.set_onAsideToggle();
        }
    }

    //  Action  -------------------------------------------------------  Action EHs  //
    handle_onActionClick = () => {
        if (this.state.action.state) {
            this.handle_onSessionStart();
        } else {
            this.handle_onItemCreate();
        }
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let list = (<Throbber/>);
        if (!this.props.loading) {
            list = (
                <List
                    backingCollection={this.state.state}
                    onDelete={this.handle_onItemDelete}
                    onEdit={this.handle_onItemEdit}
                    onSelect={this.handle_onItemSelect}
                    selected={this.state.selected}>
                    <ActionButton
                        onClick={this.handle_onActionClick}
                        state={this.state.action.state}
                        values={['Create', 'Study']}/>
                </List>
            );
        }
        return (
            <Aux>
                <Header
                    onA={this.handle_onAsideToggle}
                    onB={this.handle_onAsideToggle}
                    onClick={this.handle_onAsideClose}
                    onNavigation={this.handle_onAsideToggle}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.handle_onListOut}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        {list}
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
        loading: select_isLoading(state),
        token: state.auth.token,
        userId: state.auth.userId,
        user: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        delete_async: (url, token, key) => dispatch(actions.delete_async(url, token, key)),
        get_async: (url, token, user) => dispatch(actions.get_async(url, token, user)),
        post_async: (url, token, data) => dispatch(actions.post_async(url, token, data)),
        put_async: (url, token, key, data) => dispatch(actions.put_async(url, token, key, data)),
        createDeleteModal_sync: (data) => dispatch(actions.createDeleteModal_sync(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);