import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as sortType from '../../store/reducers/sortTypes';
import * as utility from '../../utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside from '../../components/aside/Aside/Aside';
import Aux from '../../hoc/Aux/Aux';
import ContextActions from '../../components/ui/Context/ContextActions';
import Header from '../../components/Header/Header';
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
        showConfirm: false,
        deleted: [],
        decks: {},
        history: {
            store: {},
            undo: null
        },
        selected: [],
        state: 'decks'
    }

    componentDidMount () {
        this.setState(prev => ({
            ...prev,
            decks: this.props.select_decks
        }));
    }


    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    //  Aside  -----------------------------------------------------  Aside Setters  //
    // set_onAsideClose () {
    //     this.setState(previous => ({
    //         ...previous,
    //         aside: {
    //             ...previous.aside,
    //             actions: {},
    //             data: {}
    //         }
    //     }));
    // }
    // set_onAsideOpen (payload) {
    //     this.setState(previous => ({
    //         ...previous,
    //         aside: {
    //             ...previous.aside,
    //             actions: payload.actions ? payload.actions : {},
    //             data: payload.data ? payload.data : {},
    //         }
    //     }));
    // }
    // set_onAsideStateChange (payload) {
    //     this.setState(previous => ({
    //         ...previous,
    //         aside: {
    //             ...previous.aside,
    //             state: payload.state
    //         }
    //     }));
    // }
    // set_onAsideToggle () {
    //     this.setState(previousState => ({
    //         ...previousState,
    //         aside: {
    //             ...previousState.aside,
    //             isActive: !previousState.aside.isActive
    //         }
    //     }));
    // }
    // set_onQuickInspectChange (payload) {
    //     this.setState(previous => ({
    //         ...previous,
    //         aside: {
    //             ...previous.aside,
    //             data: {
    //                 ...previous.aside.data,
    //                 [payload.target]: payload.value
    //             }
    //         }
    //     }))
    // }

    // //  List  -------------------------------------------------------- List Setters  //
    // set_onItemDeselect (payload) {
    //     this.setState(previous => ({
    //         ...previous,
    //         selected: previous.selected.filter(key => key !== payload.key)
    //     }));
    // }
    // set_onItemSelect (payload) {
    //     this.setState(previous => ({
    //         ...previous,
    //         selected: previous.selected.concat(payload.key)
    //     }));
    // }

    // //  History  -------------------------------------------------- History Setters  //
    // set_onHistoryChange (store, undo) {
    //     this.setState(previous => ({
    //         ...previous,
    //         history: {
    //             store: {
    //                 ...store
    //             },
    //             undo: undo
    //         }
    //     }));
    // }


    // //  EVENT HANDLERS  --------------------------------------------  EVENT HANDERS  //
    // //  History  -----------------------------------------------------  History EHs  //
    // handle_onHistoryUndo = () => {
    //     this.state.history.undo(this.state.history.store);
    // }

    // //  Aside  ---------------------------------------------------------  Aside EHs  //
    // handle_onAsideClose = () => {
    //     if (this.state.aside.isActive) {
    //         this.set_onAsideClose();
    //         this.set_onAsideToggle();
    //         if (this.state.aside.state === 99) {
    //             this.set_onAsideStateChange(0);
    //             this.handle_onHistoryUndo();
    //         }
    //     }
    // }
    // handle_onAsideConfirm = () => {
    //     this.set_onAsideToggle();
    //     this.set_onAsideClose();
    // }
    // handle_onAsideToggle = (payload) => {
    //     if (this.state.aside.isActive) {
    //         if (this.state.aside.state === payload.state) {
    //             this.set_onAsideToggle();
    //         } else {
    //             this.set_onAsideOpen(payload);
    //             this.set_onAsideStateChange(payload);
    //         }
    //     } else {
    //         this.set_onAsideToggle();
    //         this.set_onAsideOpen(payload);
    //         this.set_onAsideStateChange(payload);
    //     }
    // }


    // //  List  -----------------------------------------------------------  List EHs  //
    // handle_onItemDelete = (payload) => {
    //     this.props.displayModal(modalTypes.DELETE, payload);
    // }
    // handle_onItemEdit = (payload) => {
    //     console.log(payload);
    //     const aside = {
    //         actions: {
    //             ...payload.actions,
    //             onConfirm: (putPayload) => {
    //                 this.handle_onAsideConfirm();
    //                 this.props.putDeck_async(this.state.state, this.props.select_token, this.state.aside.data.key, {
    //                     ...putPayload.data,
    //                     userId: this.props.select_user
    //                 });
    //             }
    //         },
    //         data: {
    //             ...payload.data,
    //             key: payload.key,
    //             user: this.props.select_user
    //         }
    //     }
    //     this.set_onHistoryChange(aside, payload.actions.onCancel);
    //     this.set_onAsideOpen(aside);
    //     this.set_onAsideStateChange(99);
    //     this.set_onAsideToggle();
    // }
    // handle_onItemSelect = (payload) => {
    //     console.log(payload);
    //     // if (this.state.selected.indexOf(payload.key) > -1) {
    //     //     this.set_onItemDeselect(payload);
    //     // } else {
    //     //     this.set_onItemSelect(payload);
    //     // }
    //     // if (this.state.aside.isActive && this.state.aside.state === 99) {
    //     //     this.set_onAsideStateChange(0);
    //     //     this.set_onAsideToggle();
    //     //     if (this.state.history.undo) {
    //     //         this.handle_onHistoryUndo();
    //     //     }
    //     // }
    // }
    // handle_onListOut = () => {
    //     if (this.state.selected.length) {
    //         //  Deselect all items
    //         this.state.selected.forEach(key => {
    //             this.set_onItemDeselect({key: key})
    //         });
    //     }
    //     if (this.state.aside.isActive) {
    //         //  Close the aside if it is open
    //         this.set_onAsideToggle();
    //     }
    // }

    // //  Action  -------------------------------------------------------  Action EHs  //
    // handle_onSessionStart = () => {
    //     console.log('Start a session...');
    // }
    // handle_onItemCreate = () => {
    //     this.props.postDeck_async(this.props.select_token, {
    //         details: 'This is a new flashcard deck',
    //         title: utility.createHashId() + ' New Flashcard Deck',
    //         userId: this.props.select_user
    //     });
    // }
    // handle_onActionClick = () => {
    //     if (this.state.action.state) {
    //         this.handle_onSessionStart();
    //     } else {
    //         this.handle_onItemCreate();
    //     }
    // }

    // //  Bulk Actions  -------------------------------------------  Bulk Actions EHs  //
    // handle_onBulkDelete = () => {
    //     let selected = [];
    //     this.state.selected.forEach(key => {
    //         this.props.select_collection.forEach(item => {
    //             if (item.key === key) {
    //                 selected.push(item.data.title);
    //             }
    //         });
    //     });
    //     const modal = {
    //         actions: {
    //             onConfirm: () => {
    //                 this.state.selected.forEach(key => {
    //                     this.set_onItemDeselect({key: key});
    //                     this.props.delete_async(this.state.state, this.props.select_token, key);
    //                 });
    //             }
    //         },
    //         data: {
    //             cancel: 'Cancel',
    //             confirm: 'Delete',
    //             details: [...selected],
    //             key: undefined,
    //             message: 'Once you delete a item it cannot be recovered. Are you sure you wish to delete the following items?',
    //             title: 'Warning',
    //             type: 1,
    //         }
    //     }
    //     this.props.createDeleteModal_sync(modal);
    // }

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
    setAsideState (state) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: state
            }
        }));
    }
    toggleAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                isActive: !prev.aside.isActive
            }
        }));
    }

    //  List  ---------------------------------------------------------------  List  //
    addSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.concat(key)
        }));
    }
    clearSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: []
        }));
    }
    removeSelected (key) {
        this.setState(prev => ({
            ...prev,
            selected: prev.selected.filter(k => k !== key)
        }));
    }
    setConfirm (bool) {
        this.setState(prev => ({
            ...prev,
            confirm: bool
        }));
    }
    toggleConfirm () {
        this.setState(prev => ({
            ...prev,
            confirm: !prev.confirm
        }));
    }

    createItem (item) {
        console.log(item);
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,
                [item.id]: item
            }
        }));
    }
    removeItem (id) {
        const collection = this.state.decks;
        delete collection[id];
        this.setState(prev => ({
            ...prev,
            decks: {...collection}
        }));
    }
    updateItem (id, target, value) {
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,
                [id]: {
                    ...prev.decks[id],
                    [target]: value
                }
            }
        }))
    }
    getItemById (id) {
        return {
            ...this.state.decks[id],
            id: id
        }
    }
    clearAsideData () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {}
            }
        }));
    }
    clearAsideActions () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: {}
            }
        }));
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



    //  EVENT HANDLERS v2  //
    onActionClick = () => {
        let id = utility.createHashId(0);
        let item = {
            details: 'These are details for this flashcard',
            id: id,
            title: id + ' Flashcard Deck',
            user: this.props.select_user
        }
        this.createItem(item);
        this.props.postDeck_async(this.props.select_token, item);
    }

    //  Aside  -------------------------------------------------------------  Aside  //
    onAsideClose = state => {
        if (this.state.aside.isActive) {
            this.clearAsideActions();
            this.clearAsideData();
            this.toggleAside();
            if (this.state.aside.state === 99) {
                this.state.history.undo();
                this.setAsideState(0);
                //this.setAsideData(this.state.history.last);
            }
        }
    }
    onAsideToggle = state => {
        if (this.state.aside.state === state) {
            this.toggleAside();
        } else {
            this.setAsideState(state);
            if (!this.state.aside.isActive) {
                this.toggleAside();
            }
        }
    }

    //  List  ---------------------------------------------------------------  List  //
    onListOut = () => {
        if (this.state.aside.isActive) {
            console.log('here');
            this.onAsideClose();
        }
    }
    onItemDelete = id => {
        this.removeSelected(id);
        this.removeItem(id);
        this.props.deleteDeck_async(this.props.select_token, id);
    }
    onItemUpdate = (id) => {
        this.clearAsideData();
        this.clearAsideActions();
        this.props.putDeck_async(this.props.select_token, this.getItemById(id));
    }
    onItemChange = (id, target, value) => {
        this.updateItem(id, target, value);
    }
    onItemInspect = id => {
        this.setAsideState(99);
        this.toggleAside();
        this.setAsideData(this.getItemById(id));
        this.setHistory({
            last: this.getItemById(id),
            undo: this.resetItem
        });
        this.setAsideAction({
            onChange: this.onItemChange,
            onConfirm: this.onItemUpdate
        });
    }
    onItemSelect = id => {
        this.setConfirm(false);
        if (this.state.selected.indexOf(id) > -1) {
            this.removeSelected(id);
        } else {
            this.addSelected(id)
        }
        if (this.state.aside.isActive && this.state.aside.state === 99) {
            this.onAsideClose();
        }
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        return (
            <Aux>
                <Header
                    onA={this.onAsideToggle}
                    onB={this.onAsideToggle}
                    onC={this.foo}
                    onClick={this.onAsideClose}
                    onNavigation={this.onAsideToggle}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.onListOut}>
                    <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                        <List
                            backingCollection={this.state.decks}
                            onConfirm={this.onItemDelete}
                            onInspect={this.onItemInspect}
                            onSelect={this.onItemSelect}>
                        </List>
                        <ActionButton
                            onClick={this.onActionClick}
                            state={this.state.action.state}
                            values={['Create', 'Study']}/>
                    </div>
                </main>
                <Aside
                    actions={this.state.aside.actions}
                    active={this.state.aside.isActive}
                    data={this.state.aside.data}
                    onClose={this.onAsideClose}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        select_deckIsLoading: select.deckIsLoading(state),
        select_decks: select.decks(state),
        select_token: select.authToken(state),
        select_user: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteDeck_async: (token, id) => dispatch(actions.deleteDeck_async(token, id)),
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        postDeck_async: (token, data) => dispatch(actions.postDeck_async(token, data)),
        putDeck_async: (token, data) => dispatch(actions.putDeck_async(token, data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);