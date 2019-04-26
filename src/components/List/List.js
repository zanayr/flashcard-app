import React from 'react';
import {connect} from 'react-redux';
import {select_collectionBy} from '../../store/reducers/root';
import * as sortType from '../../store/reducers/sortTypes';

import Aux from '../../hoc/Aux/Aux';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';


const list = (props) => {


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Context Actions  ------------------------------------------------- C.A. EHs  //
    const handle_onDeleteClick = (payload) => {
        props.onDelete(payload);
    }

    //  Item  -----------------------------------------------------------  Item EHs  //
    const handle_onItemSelect = (payload) => {
        props.onSelect(payload);
    }

    
    let listItems = props.decks.map(deck => {
        let isSingle = false;
        if (props.selected.length === 1 && props.selected[0] === deck.key) {
            isSingle = true;
        }
        return (
            <ListItem
                key={deck.key}
                data={deck.data}
                onDelete={handle_onDeleteClick}
                onEdit={props.onEdit}
                onSelect={handle_onItemSelect}
                single={isSingle}
                uniqueId={deck.key}/>
        );
    });

    return (
        <Aux>
            {props.children}
            <section className={[AppCSS.With_Margin, ListCSS.List].join(' ')}>
                <div className={AppCSS.Inner}>
                    {listItems}
                </div>
            </section>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        decks: select_collectionBy(state, 'decks', sortType.ALPHA_DEC)
    }
}


export default connect(mapStateToProps)(list);