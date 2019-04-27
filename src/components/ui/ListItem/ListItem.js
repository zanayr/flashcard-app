import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as select from '../../../store/reducers/root';

import Aux from '../../../hoc/Aux/Aux';
import Column from '../../../hoc/Column/Column';

import Throbber from '../../ui/Throbber/Throbber';

import AppCSS from '../../../App.module.css';
import ListItemCSS from './ListItem.module.css';

class ListItem extends Component {
    state = {
        isSelected: false
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log(nextProps.onSelect !== this.props.onSelect);
        return nextProps.selected !== this.props.selected || nextProps.single !== this.props.single;// || nextProps.deleted !== this.props.deleted;
    }



    //  STATE SETTERS  ----------------------------------------------  STATE SETTERS  //
    //  Item  --------------------------------------------------------- Item Setters  //
    // set_onItemChange = (payload) => {
    //     this.setState(previousState => ({
    //         ...previousState,
    //         data: {
    //             ...previousState.data,
    //             [payload.target]: payload.value
    //         }
    //     }));
    // }
    // set_onItemDelete = () => {
    //     this.setState(previousState => ({
    //         ...previousState,
    //         isDeleted: true
    //     }));
    // }
    // set_onItemReset = (payload) => {
    //     this.setState(previousState => ({
    //         ...previousState,
    //         data: {
    //             ...payload.data
    //         }
    //     }));
    // }
    toggle_isSelected () {
        this.setState(previousState => ({
            ...previousState,
            isSelected: !previousState.isSelected
        }));
    }
    // set_onItemVisibleToggle () {
    //     this.setState(previous => ({
    //         ...previous,
    //         isVisible: !previous.isVisible
    //     }));
    // }


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Item  -----------------------------------------------------------  Item HEs  //
    // handle_onItemChange = (payload) => {
    //     this.set_onItemChange(payload);
    // }
    // handle_onItemReset = (payload) => {
    //     this.set_onItemReset(payload);
    // }
    handle_onItemSelect = (e) => {
        e.stopPropagation();
        
        this.toggle_isSelected();
        this.props.onSelect({
            key: this.props.uniqueId
        });
    }

    //  Context Actions -------------------------------------------------  C.A. HEs  //
    // handle_onEditClick = () => {
    //     this.props.onEdit({
    //         key: this.props.uniqueId,
    //         data: {
    //             details: this.state.details,
    //             title: this.state.title
    //         },
    //         actions: {
    //             onCancel: this.handle_onItemReset,
    //             onChange: this.handle_onItemChange
    //         }
    //     });
    // }
    // handle_onDeleteClick = () => {
    //     this.props.onDelete({
    //         key: this.props.uniqueId
    //     });
    // }


    //  RENDER METHOD  ----------------------------------------------- RENDER METHOD //
    render () {
        console.log('rendering item:', this.props.uniqueId);

        let cssClasses = [ListItemCSS.List_Item];
        // if (this.props.new) {
        //     cssClasses = [...cssClasses, ListItemCSS.New];
        // }
        if (this.props.selected) {
            cssClasses = [...cssClasses, ListItemCSS.Selected];
        }
        // if (!this.props.visible || this.props.select_deck.isDeleted) {
        //     cssClasses = [ListItemCSS.List_Item, ListItemCSS.Selected, ListItemCSS.Hidden];
        // }
        // let contextActions = (null);
        // if (this.props.single) {
        //     contextActions = (
        //         <Aux>
        //             <QuickButton
        //                 active={this.state.isSelected && this.props.single && this.props.visible}
        //                 onClick={this.handle_onEditClick}>
        //                 Edit
        //             </QuickButton>
        //             <QuickButton
        //                 active={this.state.isSelected && this.props.single && this.props.visible}
        //                 delete
        //                 onClick={this.handle_onDeleteClick}>
        //                 Delete
        //             </QuickButton>
        //         </Aux>
        //     );
        // }

        return (
            <div
                className={cssClasses.join(' ')}
                onClick={this.handle_onItemSelect}>
                <div className={AppCSS.Inner}>
                    {this.props.children}
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