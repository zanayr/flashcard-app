import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDecksBy} from '../../store/reducers/root';
import * as sortType from '../../store/reducers/sortTypes';

import Aux from '../../hoc/Aux/Aux';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';

class List extends Component {
    state = {
        selected: []
    }

    toogleSelectedItem (id) {
        if (this.state.selected.indexOf(id) > -1) {
            this.setState(previousState => ({
                ...previousState,
                selected: previousState.selected.filter(i => i !== id)
            }));
        } else {
            this.setState(previousState => ({
                ...previousState,
                selected: previousState.selected.concat(id)
            }));
        }
    }

    handle_onDeleteClick = (payload) => {
        this.props.onDelete(payload);
    }
    handle_onEditClick = (payload) => {
        this.props.onEdit({
            ...payload,
            state: 99
        });
    }
    handle_onItemSelect = (payload) => {
        this.toogleSelectedItem(payload.key);
    }

    render() {
        let listItems = this.props.decks.map(deck => {
            let isSingle = false;
            if (this.state.selected.length === 1 && this.state.selected[0] === deck.key) {
                isSingle = true;
            }
            return (
                <ListItem
                    key={deck.key}
                    data={deck.data}
                    onDelete={this.handle_onDeleteClick}
                    onEdit={this.handle_onEditClick}
                    onSelect={this.handle_onItemSelect}
                    single={isSingle}
                    uniqueId={deck.key}/>
            );
        });
        return (
            <Aux>
                {this.props.children}
                <section className={[AppCSS.With_Margin, ListCSS.List].join(' ')}>
                    <div className={AppCSS.Inner}>
                        {listItems}
                    </div>
                </section>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        decks: getDecksBy(state, sortType.ALPHA_DEC),
        posting: state.collection.isPosting,
    }
}

export default connect(mapStateToProps)(List);