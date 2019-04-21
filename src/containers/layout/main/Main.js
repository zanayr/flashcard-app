import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../../store/actions/index";
import _hashIdCreate from "../../../helper/id";

import Aux from "../../../hoc/aux/Aux";
import Header from "../../../components/ui/header/Header";
import Aside from "../../../components/ui/asides/Aside";
import ActionButton from "../../../components/ui/button/action/ActionButton";
import List from "../../../components/ui/list/List";

import "../../../style.css";
import globalCSS from "../../../Global.module.css";
import MainCSS from "./Main.module.css";

class Main extends Component {
    state = {
        aside: {
            isActive: false,
            state: 0
        },
        action: {
            isActive: true,
            state: 0
        },
        collections: {},
        selectedCollectionID: ''
    }

    //  List Methods
    _collectionDelete = (id) => {
        let collections = {...this.state.collections};
        delete collections[id];
        this.setState(prev => ({
            ...prev,
            collections: {
                ...collections,
            }
        }));
    }
    _collectionSelect = (id) => {
        this.setState(prev => ({
            ...prev,
            selectedCollectionID: id
        }), () => {
            if (this.state.aside.state === 3 && this.state.aside.isActive && !this.state.selectedCollectionID) {
                this._asideToggle(3);
            }
        });
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
                    isActive: false
                }
            }));
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
    handle_onCollectionSelected = (id) => {
        this._collectionSelect(id);
    }
    handle_onDeleteClicked = (id) => {
        this._collectionDelete(id);
    }
    handle_onEditClicked = () => {
        this._asideToggle(3);
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
    handle_onEditChange = (e, id, prop) => {
        this._collectionUpdate(id, prop, e.target.value);
    }
    handle_onXClicked = () => {
        this._asideClose();
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
                    className={MainCSS.Default}
                    onClick={(e) => this.handle_onClicked(e)}>
                    <div className={globalCSS.Inner}>
                        <List
                            listItems={this.state.collections}
                            onDelete={this.handle_onDeleteClicked}
                            onEdit={this.handle_onEditClicked}
                            onSelect={this.handle_onCollectionSelected}>
                            <ActionButton
                                active={this.state.action.isActive}
                                onClick={this.handle_onActionClicked}
                                state={this.state.action.state}
                                values={["Create", "Study"]}/>
                        </List>
                    </div>
                </main>
                <Aside
                    active={this.state.aside.isActive}
                    data={this.state.selectedCollectionID ? {
                        details: this.state.collections[this.state.selectedCollectionID].details,
                        id: this.state.selectedCollectionID,
                        title: this.state.collections[this.state.selectedCollectionID].title,
                    } : {}}
                    onChange={this.handle_onEditChange}
                    onX={this.handle_onXClicked}
                    state={this.state.aside.state}/>
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