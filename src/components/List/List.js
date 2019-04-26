import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {select_collectionBy} from '../../store/reducers/root';
// import * as sortType from '../../store/reducers/sortTypes';

import Aux from '../../hoc/Aux/Aux';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';


class List extends Component {


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Context Actions  ------------------------------------------------- C.A. EHs  //
    handle_onDeleteClick = (payload) => {
        this.props.onDelete(payload);
    }

    //  Item  -----------------------------------------------------------  Item EHs  //
    handle_onItemSelect = (payload) => {
        this.props.onSelect(payload);
    }

    render () {
        // let listItems = this.props.decks.map(deck => {
        //     let isSingle = false;
        //     if (this.props.selected.length === 1 && this.props.selected[0] === deck.key) {
        //         isSingle = true;
        //     }

        //     return (
        //         <ListItem
        //             key={deck.key}
        //             //data={deck.data}
        //             deleted={deck.data.isDeleted}
        //             onDelete={this.handle_onDeleteClick}
        //             onEdit={this.props.onEdit}
        //             onSelect={this.handle_onItemSelect}
        //             single={isSingle}
        //             uniqueId={deck.key}/>
        //     );
        // });
        // {this.props.children}
        //         <section className={[AppCSS.With_Margin, ListCSS.List].join(' ')}>
        //             <div className={AppCSS.Inner}>
        //                 {listItems}
        //             </div>
        //         </section>

        return (
            <Aux>
                <h1>Hello World!</h1>
            </Aux>
        );
    }
}


// const mapStateToProps = state => {
//     return {
//         decks: select_collectionBy(state, 'decks', sortType.ALPHA_DEC)
//     }
// }

export default List;
// export default connect(mapStateToProps)(List);