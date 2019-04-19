import React, {Component} from 'react';

import IconButton from '../button/icon/IconButton';

import globalCSS from '../../../Global.module.css';
import toolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <div className={toolbarCSS.Toolbar}>
            <div className={globalCSS.Inner}>
                <IconButton onClick={props.onDelete}>D</IconButton>
                <IconButton onClick={props.onShare}>S</IconButton>
                <IconButton onClick={props.onFilter}>F</IconButton>
                <IconButton onClick={props.onX}>X</IconButton>
                <IconButton onClick={props.onY}>X</IconButton>
            </div>
        </div>
    );
}

export default toolbar;
/*
class Toolbar extends Component {
    constructor() {
        super();
        this._getNewDialog = this._getNewDialog.bind(this);
        this.state = {
            dialog: this._getNewDialog(),
            message: ''
        };
    }

    _getNewDialog() {
        return {
            id: 0,
            message: '',
            confirm: null,
            cancel: null
        }
    }

    _updateState(event) {
        this.state.dialog.message = this.state.message;
        this.setState({dialog: this.state.dialog});
    }

    _addNewDialog(message, event) {
        event.preventDefault();
        this.state.dialog.message = message;
        EggheadActions.addNewDialog(this.state.dialog);
        this.setState({dialog: this._getNewDialog()});
    }
    _toggleAside(id, event) {
        event.preventDefault();
        if (!AsideStore.getActive()) {
            console.log("toolbar toggle");
            AsideStore._toggleAside(id);
        } else {
            console.log("toolbar update");
            AsideStore._updateAsideID(id);
        }
    }

    updateMessage(m) {
        this.setState({message: m});
    }

    render() {
        return (
            <div className={toolbarCSS.toolbar}>
                <div className={appCSS.row}>
                    <IconButton value="Edit" onClick={this._addNewDialog.bind(this)}/>
                    <IconButton value="Delete" id="1" onClick={this._toggleAside.bind(this)}/>
                    <IconButton value="Share" id="2" onClick={this._toggleAside.bind(this)}/>
                    <IconButton value="Filter" id="3" onClick={this._toggleAside.bind(this)}/>
                    <IconButton value="Style" id="4" onClick={this._toggleAside.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Toolbar;*/