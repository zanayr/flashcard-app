import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {select_collectionBy} from '../../store/reducers/root';
// import * as sortType from '../../store/reducers/sortTypes';

import Aux from '../../hoc/Aux/Aux';
import QuickButton from '../ui/button/Context/ContextButton';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';
import ListTemplate from '../ui/ListTemplate/ListTemplate';


class List extends Component {
    state = {
        confirm: false,
        hidden: [],
        selected: []
    }


    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    //  Items  ------------------------------------------------------  Item Setters  //  
    set_deleted (payload) {
        this.setState(previous => ({
            ...previous,
            deleted: previous.selected.concat(payload.key)
        }));
    }
    set_selected (payload) {
        if (this.state.selected.indexOf(payload.key) > -1) {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.filter(key => key !== payload.key)
            }));
        } else {
            this.setState(previous => ({
                ...previous,
                selected: previous.selected.concat(payload.key)
            }));
        }
    }
    setw07_confirm (payload) {
        this.setState(previous => ({
            ...previous,
            confirm: payload
        }));
    }

    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Item  -----------------------------------------------------------  Item EHs  //
    handle_onItemSelect = (payload) => {
        this.set_selected(payload);
        this.set_confirm(false);
        this.props.onSelect()
    }

    //  Context Actions  --------------------------------------------------- CA EHs  //
    handle_onDeleteClick = () => {
        this.set_confirm(true);
        //this.props.onDelete(payload);
    }

    render () {
        let listItems = this.props.backingCollection.map(item => {
            return (
                <ListItem
                    key={item.key}
                    //deleted={this.state.selected.indexOf(item.key) > -1}
                    selected={this.state.selected.indexOf(item.key) > -1}
                    onSelect={this.handle_onItemSelect}
                    single={this.state.selected.length === 1 && this.state.selected[0] === item.key}
                    foo={this.state.confirm && this.state.selected[0] === item.key}
                    uniqueId={item.key}>
                    <ListTemplate
                        title={item.title}
                        details={item.details}/>
                    <QuickButton
                        active={this.state.selected.length === 1 && this.state.selected[0] === item.key}
                        onClick={this.handle_onEditClick}>
                        Edit
                    </QuickButton>
                    <QuickButton
                        active={this.state.selected.length === 1 && this.state.selected[0] === item.key}
                        delete
                        onClick={this.handle_onDeleteClick}>
                        Delete
                    </QuickButton>
                    <QuickButton
                        active={this.state.confirm && this.state.selected.length === 1 && this.state.selected[0] === item.key}
                        confirm
                        onClick={this.handle_onConfirm}>
                        Confirm
                    </QuickButton>
                </ListItem>
            );
        });

        return (
            <Aux>
                 <section className={[AppCSS.With_Margin, ListCSS.List].join(' ')}>
                     <div className={AppCSS.Inner}>
                         {listItems}
                     </div>
                 </section>
                 {this.props.children}
            </Aux>
        );
    }
}


export default List;