import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as modalTypes from '../../components/modal/Modal/modalTypes';
import * as select from '../../store/reducers/root';
import * as sortType from '../../store/reducers/sortTypes';
import * as utility from '../../utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import SelectableList from '../../components/List/SelectableList';
import SelectableListItem from '../../components/ui/ListItem/SelectableListItem';
import ContextAction from '../../components/ui/button/Context/ContextAction';
import List from '../../components/List/List';

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
        decks: [],
        deleted: [],
        history: {
            store: {},
            undo: null
        },
        selected: [],
        state: 'decks'
    }

    componentDidMount () {
        this.setState(previous => ({
            ...previous,
            decks: this.props.select_decks
        }));
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
    set_onAsideStateChange (payload) {
        this.setState(previous => ({
            ...previous,
            aside: {
                ...previous.aside,
                state: payload.state
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
    set_onItemDeselect (payload) {
        this.setState(previous => ({
            ...previous,
            selected: previous.selected.filter(key => key !== payload.key)
        }));
    }
    set_onItemSelect (payload) {
        this.setState(previous => ({
            ...previous,
            selected: previous.selected.concat(payload.key)
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
                this.set_onAsideStateChange(payload);
            }
        } else {
            this.set_onAsideToggle();
            this.set_onAsideOpen(payload);
            this.set_onAsideStateChange(payload);
        }
    }


    //  List  -----------------------------------------------------------  List EHs  //
    handle_onItemDelete = (payload) => {
        this.props.displayModal(modalTypes.DELETE, payload);
    }
    handle_onItemEdit = (payload) => {
        console.log(payload);
        const aside = {
            actions: {
                ...payload.actions,
                onConfirm: (putPayload) => {
                    this.handle_onAsideConfirm();
                    this.props.putDeck_async(this.state.state, this.props.select_token, this.state.aside.data.key, {
                        ...putPayload.data,
                        userId: this.props.select_user
                    });
                }
            },
            data: {
                ...payload.data,
                key: payload.key,
                user: this.props.select_user
            }
        }
        this.set_onHistoryChange(aside, payload.actions.onCancel);
        this.set_onAsideOpen(aside);
        this.set_onAsideStateChange(99);
        this.set_onAsideToggle();
    }
    handle_onItemSelect = (payload) => {
        console.log(payload);
        // if (this.state.selected.indexOf(payload.key) > -1) {
        //     this.set_onItemDeselect(payload);
        // } else {
        //     this.set_onItemSelect(payload);
        // }
        // if (this.state.aside.isActive && this.state.aside.state === 99) {
        //     this.set_onAsideStateChange(0);
        //     this.set_onAsideToggle();
        //     if (this.state.history.undo) {
        //         this.handle_onHistoryUndo();
        //     }
        // }
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
    handle_onSessionStart = () => {
        console.log('Start a session...');
    }
    handle_onItemCreate = () => {
        this.props.postDeck_async(this.props.select_token, {
            details: 'This is a new flashcard deck',
            title: utility.createHashId() + ' New Flashcard Deck',
            userId: this.props.select_user
        });
    }
    handle_onActionClick = () => {
        if (this.state.action.state) {
            this.handle_onSessionStart();
        } else {
            this.handle_onItemCreate();
        }
    }

    //  Bulk Actions  -------------------------------------------  Bulk Actions EHs  //
    handle_onBulkDelete = () => {
        let selected = [];
        this.state.selected.forEach(key => {
            this.props.select_collection.forEach(item => {
                if (item.key === key) {
                    selected.push(item.data.title);
                }
            });
        });
        const modal = {
            actions: {
                onConfirm: () => {
                    this.state.selected.forEach(key => {
                        this.set_onItemDeselect({key: key});
                        this.props.delete_async(this.state.state, this.props.select_token, key);
                    });
                }
            },
            data: {
                cancel: 'Cancel',
                confirm: 'Delete',
                details: [...selected],
                key: undefined,
                message: 'Once you delete a item it cannot be recovered. Are you sure you wish to delete the following items?',
                title: 'Warning',
                type: 1,
            }
        }
        this.props.createDeleteModal_sync(modal);
    }

    //  STATE SETTERS v2  //
    setSelected (payload) {
        if (this.state.selected.indexOf(payload.key) > -1) {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.filter(key => key !== payload.key)
            }), () => {
                console.log(this.state.selected.length)
            });
        } else {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.concat(payload.key)
            }), () => {
                console.log(this.state.selected.length)
            });
        }
    }

    //  EVENT HANDLERS v2  //
    onItemDelete = (payload) => {
        this.props.deleteDeck_async(this.props.select_token, payload);
    }
    onItemInspect = (payload) => {
        console.log(payload);
        //setAsideState(99);
    }
    onItemSelect = (payload) => {
        this.setSelected(payload)
    }

    foo = (payload) => {
        let decks = this.state.decks;
        decks[0].title = 'foo';
        console.log(decks[0]);
        this.setState(previous => ({
            ...previous,
            decks: [...decks]
        }));
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        return (
            <Aux>
                <Header
                    onA={this.handle_onAsideToggle}
                    onB={this.handle_onAsideToggle}
                    onC={this.foo}
                    onClick={this.handle_onAsideClose}
                    onNavigation={this.handle_onAsideToggle}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.handle_onListOut}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        <SelectableList
                            backingCollection={this.state.decks}
                            onConfirm={this.onItemDelete}
                            onEdit={this.onItemInspect}
                            onSelect={this.onItemSelect}>
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={this.state.action.state}
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
        select_deckIsLoading: select.deckIsLoading(state),
        select_decks: select.decksBy(state, sortType.ALPHA_DEC),
        select_token: select.authToken(state),
        select_user: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteDeck_async: (token, key) => dispatch(actions.deleteDeck_async(token, key)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        getAllDecks_async: (token, user) => dispatch(actions.getAllDecks_async(token, user)),
        postDeck_async: (token, data) => dispatch(actions.postDeck_async(token, data)),
        putDeck_async: (token, key, data) => dispatch(actions.putDeck_async(token, key, data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);