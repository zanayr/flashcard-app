import React, {Component} from "react";
import {connect} from "react-redux";
import _deckConnection from "../../../database/deck";
import withDatabaseLayer from "../../../hoc/database/withDatabaseLayer";
import withErrorModal from "../../../hoc/withErrorModal/withErrorModal";

import * as actions from "../../../store/actions/index";
import _hashIdCreate from "../../../helper/id";

import Aux from "../../../hoc/aux/Aux";
import Header from "../../../components/ui/Header/Header";
import List from "../../../components/ui/list/List";
import ActionButton from "../../../components/ui/button/action/ActionButton";
import Aside from "../../../components/ui/asides/Aside";
import Modal from "../../../components/ui/modal/Modal";

import "../../../style.css";
import globalCSS from "../../../Global.module.css";
import mainCSS from "./Main.module.css";

class Main extends Component {
    state = {
        aside: {
            data: {},
            isActive: false,
            state: 0
        },
        action: {
            isActive: true,
            state: 0
        },
        decks: {
            all: this.props.data,
            isActive: true,
            selected: [],
        },
        modal: {
            data: {
                cancel: '',
                confirm: '',
                details: [],
                message: '',
                title: '',
                type: 0
            },
            isActive: false,
            onConfirm: null,
            onCancel: null,
            state: 0
        }
    }

    // Methods...
    _deckDelete = (id) => {
        //  Delete a selected deck, replace with an async redux action
        let decks = this.state.decks.all.filter(d => d.id !== id);
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,
                all: decks
            }
        }));
    }
    _deckUpdate = (id, prop, value) => {
        let deck = this.state.decks.all.find(d => d.id === id);
        deck[prop] = value;
        
        //  Update the state...
        this.setState(prev => ({
            ...prev,
            decks: {
                ...prev.decks,

            }
        }))
    }

    _collectionUpdate = (id, prop, value) => {
        this.setState(prev => ({
            ...prev,
            collections: [
                ...prev.collections
            ]
        }));
    }

    //  Action Button Methods
    _collectionCreate = () => {
        /*
        this.setState(prev => ({
            ...prev,
            collections: {
                ...prev.collections,
                [_hashIdCreate()]: {
                    details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaq",
                    title: "Lorem Ipsum Dolor Set"
                }
            }
        }));
        */
        const deck = {
            details: "Sed ut perspiciatis unde omnis iste natus error sit",
            userId: this.props.userId,
            title: "New Flashcard Deck"
        }
        this.props.handle_onDeckCreated(this.props.token, deck);
    }
    _sessionStart = () => {
        console.log("Starting Session...");
    }

    //  Aside Methods
    _asideClose = () => {
        if (this.state.aside.isActive) {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    data: {
                        details: '',
                        id: '',
                        title: ''
                    },
                    isActive: false
                }
            }));
        }
    }
    _selectedIDUpdate = (id) => {
        this.setState(prev => ({
            ...prev,
            selectedCollectionID: id
        }), () => {
            this._asideToggle(3);
        });
    }
    _asideCheck = () => {
        if (this.state.aside.state === 3 && this.state.aside.isActive && !this.state.data) {
            this._asideToggle(3);
        }
    }
    _asideUpdate = (value) => {
        if (this.state.aside.state !== value) {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    state: value
                }
            }));
        }
    }
    _asideToggle = (value) => {
        if (!this.state.aside.isActive || this.state.aside.state === value) {
            this.setState(prev => ({
                ...prev,
                aside: {
                    ...prev.aside,
                    isActive: !prev.aside.isActive
                }
            }), () => {
                this._asideUpdate(value);
            });
        } else {
            this._asideUpdate(value);
        }
    }

    //  Modal Methods
    _selectedDataClear = () => {
        return {
            details: '',
            id: '',
            title: ''
        }
    }
    _collectionSelect(collection, callback) {
        console.log(collection);
        this.setState(prev => ({
            ...prev,
            selectedCollection: {
                ...collection
            }
        }), () => {
            if (callback) {
                callback();
            }
        });
    }
    _modalDataClear = () => {
        return {
            data: {
                cancel: '',
                confirm: '',
                details: [],
                message: '',
                title: '',
                type: 0
            },
            onCancel: null,
            onConfirm: null,
            state: 0
        }
    }
    _toggleModal = (data, callback) => {
        this.setState(prev => ({
            ...prev,
            modal: {
                ...prev.modal,
                ...data,
                isActive: !prev.modal.isActive
            }
        }), () => {
            if (callback) {
                callback();
            }
        });
    }

    // Header Event Handlers
    handle_onAClicked = () => {
        //this._asideToggle(0);
    }
    handle_onBClicked = () => {
        //this._asideToggle(1);
    }
    handle_onNavigationClicked = () => {
        //this._asideToggle(2);
    }
    
    //  List Event Handlers
    handle_onClicked = (e) => {
        e.stopPropagation();
        //this._asideClose();
    }
    handle_onCollectionSelected = () => {
        //this._asideCheck();
    }
    handle_onDeleteClicked = (id) => {
        /*
        const selected = {...this.state.collections[id], id: id};
        const modal = {
            data: {
                cancel: "Cancel",
                confirm: "Delete",
                details: [selected.title],
                message: "Are you sure you want to delete the following collections:",
                title: "Are you sure?",
                type: 0
            },
            onCancel: this.handle_onModalCancel,
            onConfirm: this.handle_onModalConfirm,
            state: 0
        }
        this._collectionSelect(selected, () => {
            this._toggleModal(modal);
        });
        */
    }
    handle_onEditClicked = (id) => {
        //this._selectedIDUpdate(id);
        /*
        this._collectionSelect(this.state.collections.find(i => i.id === id), () => {
            this._asideToggle(3);
        });
        */
    }

    //  Action Button Event Handler
    handle_onActionClicked = () => {
        /*
        if (this.state.action.state) {
            this._sessionStart();
        } else {
            this._collectionCreate();
        }
        */
    }

    //  Aside Event Handlers
    handle_onEditChange = (id, prop, value) => {
        //this._collectionUpdate(id, prop, value);
    }
    handle_onXClicked = () => {
        //this._asideClose();
    }

    //  Modal Event Handlers
    handle_onModalConfirm = () => {
        //this._toggleModal(this._modalDataClear(), this._collectionDelete);
    }
    handle_onModalCancel = () => {
        /*
        this._toggleModal(this._modalDataClear(), () => {
            this._collectionSelect(this._selectedDataClear());
        });
        */
    }

    // --------------------------------------------
    _asideUpdateState = (asideState) => {
        this.setState(prevState => ({
            ...prevState,
            aside: {
                ...prevState.aside,
                state: asideState
            }
        }));
    }
    _asideToggle = (asideState) => {
        this.setState(prevState => ({
            ...prevState,
            aside: {
                ...prevState.aside,
                isActive: !prevState.aside.isActive
            }
        }), () => {
            this._asideUpdateState(asideState);
        });
    }
    _asideClose = () => {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                data: {},
                isActive: false
            }
        }));
    }

    //  EVENT HANDLERS ------------------------------------------------- EVENT HANDLERS
    handle_onAsideToggle = (passedData) => {
        if (this.state.aside.isActive && this.state.aside.state !== passedData.asideState) {
            this._asideUpdateState(passedData.asideState);
        } else {
            this._asideToggle(passedData.asideState);
        }
    }
    handle_onAsideClose = () => {
        if (this.state.aside.isActive) {
            this._asideClose();
        }
    }
    handle_onDeckUpdate = (passedData) => {
        return;
    }


    
    //  Render Method
    render() {
        return (
            <Aux>
                <Header
                    onA={this.handle_onAsideToggle}
                    onB={this.handle_onAsideToggle}
                    onClick={this.handle_onAsideClose}
                    onNavigation={this.handle_onAsideToggle}/>
                <main
                    className={mainCSS.Main}
                    onClick={(e) => this.handle_onAsideClose(e)}>
                    <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
                        <List
                            header='Collections'
                            listItems={this.state.decks.all}
                            onDelete={this.handle_onDeleteClicked}
                            onEdit={this.handle_onEditClicked}
                            onSelect={this.handle_onCollectionSelected}>
                            <ActionButton
                                active={this.state.action.isActive}
                                onClick={this.handle_onActionClicked}
                                state={this.state.action.state}
                                values={['Create', 'Study']}/>
                        </List>
                    </div>
                </main>
                <Aside
                    active={this.state.aside.isActive}
                    data={this.state.aside.data}
                    onChange={this.handle_onDeckUpdate}
                    onClose={this.handle_onAsideToggle}
                    state={this.state.aside.state}/>
                <Modal
                    active={this.state.modal.isActive}
                    data={this.state.modal.data}
                    onConfirm={this.state.modal.onConfirm}
                    onCancel={this.state.modal.onCancel}
                    state={this.state.modal.state}/>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        decks: state.deck.decks,
        loading: state.deck.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handle_onDeckLoaded: (token, userId) => dispatch(actions.deckGet_async(token, userId)),
        handle_onDeckCreated: (token, data) => dispatch(actions.deckPost_async(token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(withDatabaseLayer(Main), _deckConnection));