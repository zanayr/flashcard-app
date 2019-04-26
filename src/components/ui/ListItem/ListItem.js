import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {get_itemByKey} from '../../../store/reducers/root';

import Column from '../../../hoc/Column/Column';
import QuickButton from '../button/Context/ContextButton';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class ListItem extends PureComponent {
    state = {
        data: this.props.get_item.data,
        isDeleted: false,
        isSelected: false,
        key: this.props.get_item.key,
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
            key: this.state.key
        });
    }

    //  Context Actions -------------------------------------------------  C.A. HEs  //
    handle_onEditClick = () => {
        this.props.onEdit({
            key: this.state.key,
            data: {...this.state.data},
            actions: {
                onCancel: this.handle_onItemReset,
                onChange: this.handle_onItemChange
            }
        });
    }
    handle_onDeleteClick = () => {
        this.props.onDelete({
            key: this.state.key,
            data: {...this.state.data},
            actions: {
                callback: this.handle_onItemDelete
            }
        });
    }


    //  RENDER METHOD  ----------------------------------------------- RENDER METHOD //
    render () {
        let cssClasses = [ListItemCSS.List_Item];
        if (this.props.data.isNew) {
            cssClasses = [...cssClasses, ListItemCSS.New];
        }
        if (this.state.isSelected) {
            cssClasses = [...cssClasses, ListItemCSS.Selected];
        }
        if (this.state.isDeleted) {
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
                        active={this.state.isSelected && this.props.single && !this.state.deleted}
                        onClick={this.handle_onEditClick}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.isSelected && this.props.single && !this.state.deleted}
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
        get_item: get_itemByKey(state, ownProps.uniqueId)
    }
}

export default connect(mapStateToProps)(ListItem);