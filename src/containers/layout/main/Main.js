import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../../store/actions/index";
import _hashIdCreate from "../../../helper/id";

import Aux from "../../../hoc/aux/Aux";
import Header from "../../../components/ui/header/Header";
import List from "../../../components/ui/list/List";
import ActionButton from "../../../components/ui/button/action/ActionButton";
import Aside from "../../../components/ui/asides/Aside";
import Overlay from "../../../components/ui/overlay/Overlay";
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
        collections: {},
        isRefreshing: false,
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
        },
        selectedCollection: {
            details: '',
            id: '',
            title: ''
        },
        selectedCollectionID: ''
    }

    //  List Methods
    _collectionDelete = () => {
        let collections = {...this.state.collections};
        delete collections[this.state.selectedCollection.id];
        this.setState(prev => ({
            ...prev,
            collections: {
                ...collections,
            },
            selectedCollectionID: ''
        }));
    }
    _collectionUpdate = (id, prop, value) => {
        this.setState(prev => ({
            ...prev,
            collections: {
                ...prev.collections,
                [id]: {
                    ...prev.collections[id],
                    [prop]: value
                }
            }
        }));
    }

    //  Action Button Methods
    _collectionCreate = () => {
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
        this._asideToggle(0);
    }
    handle_onBClicked = () => {
        this._asideToggle(1);
    }
    handle_onNavigationClicked = () => {
        this._asideToggle(2);
    }
    
    //  List Event Handlers
    handle_onClicked = (e) => {
        e.stopPropagation();
        this._asideClose();
    }
    handle_onCollectionSelected = () => {
        this._asideCheck();
    }
    handle_onDeleteClicked = (id) => {
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
    }
    handle_onEditClicked = (id) => {
        this._selectedIDUpdate(id);
    }

    //  Action Button Event Handler
    handle_onActionClicked = () => {
        if (this.state.action.state) {
            this._sessionStart();
        } else {
            this._collectionCreate();
        }
    }

    //  Aside Event Handlers
    handle_onEditChange = (id, prop, value) => {
        this._collectionUpdate(id, prop, value);
    }
    handle_onXClicked = () => {
        this._asideClose();
    }

    //  Modal Event Handlers
    handle_onModalConfirm = () => {
        this._toggleModal(this._modalDataClear(), this._collectionDelete);
    }
    handle_onModalCancel = () => {
        this._toggleModal(this._modalDataClear(), () => {
            this._collectionSelect(this._selectedDataClear());
        });
    }
    
    //  Render Method
    render() {
        return (
            <Aux>
                <Header
                    onA={this.handle_onAClicked}
                    onB={this.handle_onBClicked}
                    onNavigation={this.handle_onNavigationClicked}/>
                <main
                    className={mainCSS.Main}
                    onClick={(e) => this.handle_onClicked(e)}>
                    <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
                        <List
                            header="Collections"
                            listItems={this.state.collections}
                            onDelete={this.handle_onDeleteClicked}
                            onEdit={this.handle_onEditClicked}
                            onSelect={this.handle_onCollectionSelected}>
                            <ActionButton
                                active={this.state.action.isActive}
                                onClick={this.handle_onActionClicked}
                                state={this.state.action.state}
                                values={[
                                    "Create",
                                    "Study"
                                    ]}/>
                        </List>
                    </div>
                </main>
                <Aside
                    active={this.state.aside.isActive}
                    data={this.state.collections[this.state.selectedCollectionID] ? {
                        details: this.state.collections[this.state.selectedCollectionID].details,
                        id: this.state.selectedCollectionID,
                        title: this.state.collections[this.state.selectedCollectionID].title
                    } : {
                        details: '',
                        id: '',
                        title: ''
                    }}
                    onChange={this.handle_onEditChange}
                    onX={this.handle_onXClicked}
                    state={this.state.aside.state}/>
                <Overlay active={this.state.modal.isActive}/>
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
const mapDispatchToProps = dispatch => {
    return {
        onModalCreate: (m) => dispatch(actions.modalCreate(m))
    };
};

export default connect(null, mapDispatchToProps)(Main);