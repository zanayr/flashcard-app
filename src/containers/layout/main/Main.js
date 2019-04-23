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
            state: false
        },
        decks: this.props.data,
        selectedIDs: [],
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

    toggleAside = () => {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                isActive: !previousState.aside.isActive
            }
        }));
    }
    updateAsideData = (asideData) => {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                data: asideData
            }
        }));
    }
    updateAside = (asideData) => {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                data: asideData.data,
                state: asideData.state
            }
        }));
    }

    //  decks  //
    createDeck = () => {
        const deck = {
            details: "Sed ut perspiciatis unde omnis iste natus error sit",
            userId: this.props.userId,
            title: "New Flashcard Deck"
        }
        this.props.deckPost_async(this.props.token, deck);
    }
    startSession = () => {
        console.log("Starting Session...");
    }

    //  Action  //
    toggleAction = () => {
        this.setState(previousState => ({
            ...previousState,
            action: {
                ...previousState.action,
                state: Object.keys(this.state.selectedIDs).length >= 1
            }
        }));
    }

    //  EVENT HANDLERS --------------------------------------------- EVENT HANDLERS  //
    //  Aside //
    handle_onAsideToggle = (data) => {
        if (this.state.aside.isActive) {
            if (this.state.aside.state === data.state) {
                this.toggleAside();
            } else {
                this.updateAside(data);
            }
        } else {
            this.updateAside(data);
            this.toggleAside();
        }
    }
    handle_onAsideClose = (data) => {
        if (this.state.aside.isActive) {
            this.setState(previousState => ({
                ...previousState,
                aside: {
                    ...previousState.aside,
                    isActive: false
                }
            }));
        }
    }

    //  Decks  //
    handle_onDeckSelect = (passedData) => {
        if (this.state.aside.state === 99 && this.state.aside.isActive) {
            this.toggleAside();
        }
        if (this.state.selectedIDs.indexOf(passedData.data.id) > -1) {
            let selected = this.state.selectedIDs.filter(id => id !== passedData.data.id);
            this.setState(previousState => ({
                ...previousState,
                selectedIDs: selected
            }), () => {
                this.toggleAction();
            });
        } else {
            this.setState(previousState => ({
                ...previousState,
                selectedIDs: [
                    ...previousState.selectedIDs,
                    passedData.data.id
                ]
            }), () => {
                this.toggleAction();
            });
        }
    }
    handle_onEditClick = (data) => {
        this.updateAside({
            ...data,
            data: {
                id: data.data.id,
                title: this.state.decks[data.data.id].title,
                details: this.state.decks[data.data.id].details,
                onChange: this.handle_onDeckChange
            }
        });
        this.toggleAside();
    }
    handle_onDeckChange = (payload) => {
        let decks = this.state.decks;
        decks[payload.id][payload.updated.property] = payload.updated.value;
        this.setState(previousState => ({
            ...previousState,
            decks: {
                ...decks
            }
        }), () => {
            this.setState(previousState => ({
                ...previousState,
                aside: {
                    ...previousState.aside,
                    data: {
                        ...previousState.aside.data,
                        [payload.updated.property]: this.state.decks[payload.id][payload.updated.property]
                    }
                }
            }))
        });
    }

    //  Action Button  //
    handle_onActionClicked = (data) => {
        if (this.state.action.state) {
            this.startSession();
        } else {
            this.createDeck();
        }
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
                    onClick={this.handle_onAsideClose}>
                    <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
                        <List
                            header='Collections'
                            listItems={this.state.decks}
                            onDelete={this.handle_onDeckDelete}
                            onEdit={this.handle_onEditClick}
                            onSelect={this.handle_onDeckSelect}>
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
                    onClose={this.handle_onAsideClose}
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
        deckPost_async: (token, data) => dispatch(actions.deckPost_async(token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(withDatabaseLayer(Main), _deckConnection));