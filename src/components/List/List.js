import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {select_collectionBy} from '../../store/reducers/root';
// import * as sortType from '../../store/reducers/sortTypes';

import Aux from '../../hoc/Aux/Aux';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';


class List extends Component {
    state = {
        deleted: [],
        hidden: [],
        selected: []
    }


    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    //  Items  ------------------------------------------------------  Item Setters  //  
    set_onItemDelete (payload) {
        this.setState(previous => ({
            ...previous,
            deleted: previous.selected.concat(payload.key)
        }));
    }
    set_onItemSelect (payload) {
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


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Item  -----------------------------------------------------------  Item EHs  //
    handle_onItemSelect = (payload) => {
        this.set_onItemSelect(payload);
        //this.props.onSelect(payload);
    }

    //  Context Actions  --------------------------------------------------- CA EHs  //
    handle_onItemDelete = (payload) => {
        // this.set_onItemDelete(payload);
        this.set_onItemSelect(payload);
        this.props.onDelete(payload);
    }

    render () {
        let listItems = this.props.backingCollection.map(item => {
            return (
                <ListItem
                    key={item.key}
                    data={item}
                    onDelete={this.handle_onItemDelete}
                    deleted={item.isDeleted}
                    loading={item.isLoading}
                    // onEdit={this.props.onEdit}
                    onSelect={this.handle_onItemSelect}
                    single={this.state.selected.length === 1 && this.state.selected[0] === item.key}
                    visible={!(this.state.hidden.indexOf(item.key) > -1)}
                    uniqueId={item.key}/>
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


// const mapStateToProps = state => {
//     return {
//         decks: select_collectionBy(state, 'decks', sortType.ALPHA_DEC)
//     }
// }

export default List;
// export default connect(mapStateToProps)(List);