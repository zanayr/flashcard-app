import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

import Column from '../../../hoc/Column/Column';
import QuickButton from '../button/Context/ContextButton';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class ListItem extends Component {
    state = {
        data: this.props.select_deck,
        isSelected: false
    }

    //  STATE SETTERS  ----------------------------------------------  STATE SETTERS  //
    //  Item  --------------------------------------------------------- Item Setters  //
    set_onItemChange = (payload) => {
        this.setState(previousState => ({
            ...previousState,
            data: {
                ...previousState.data,
                [payload.target]: payload.value
            }
        }));
    }
    set_onItemDelete = () => {
        this.setState(previousState => ({
            ...previousState,
            isDeleted: true
        }));
    }
    set_onItemReset = (payload) => {
        this.setState(previousState => ({
            ...previousState,
            data: {
                ...payload.data
            }
        }));
    }
    set_onSelectedToggle () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Item  -----------------------------------------------------------  Item HEs  //
    handle_onItemChange = (payload) => {
        this.set_onItemChange(payload);
    }
    handle_onItemDelete = () => {
        this.set_onItemDelete();
    }
    handle_onItemReset = (payload) => {
        this.set_onItemReset(payload);
    }
    handle_onItemSelect (e) {
        e.stopPropagation();
        
        this.set_onSelectedToggle();
        this.props.onSelect({
            key: this.props.uniqueId
        });
    }

    //  Context Actions -------------------------------------------------  C.A. HEs  //
    handle_onEditClick = () => {
        this.props.onEdit({
            key: this.props.uniqueId,
            data: {...this.state.data},
            actions: {
                onCancel: this.handle_onItemReset,
                onChange: this.handle_onItemChange
            }
        });
    }
    handle_onDeleteClick = () => {
        this.props.onDelete({
            key: this.props.uniqueId,
            data: {...this.state.data},
            actions: {
                callback: this.handle_onItemDelete
            }
        });
    }


    //  RENDER METHOD  ----------------------------------------------- RENDER METHOD //
    render () {
        let cssClasses = [ListItemCSS.List_Item];
        if (this.state.data.isNew) {
            cssClasses = [...cssClasses, ListItemCSS.New];
        }
        if (this.state.isSelected) {
            cssClasses = [...cssClasses, ListItemCSS.Selected];
        }
        if (this.props.deleted) {
            cssClasses = [ListItemCSS.List_Item, ListItemCSS.Selected, ListItemCSS.Deleted];
        }

        return (
            <div
                className={cssClasses.join(' ')}
                onClick={(e) => this.handle_onItemSelect(e)}>
                <div className={AppCSS.Inner}>
                    <Column just='Center' align='Start'>
                        <h3>{this.state.data.title}</h3>
                        <p>{this.state.data.details}</p>
                    </Column>
                    <QuickButton
                        active={this.state.isSelected && this.props.single && !this.state.data.isDeleted}
                        onClick={this.handle_onEditClick}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && this.props.single && !this.state.data.isDeleted}
                        delete
                        onClick={this.handle_onDeleteClick}>
                        Delete
                    </QuickButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        select_deck: select.deckByKey(state, ownProps.uniqueId)
    }
}

export default connect(mapStateToProps)(ListItem);