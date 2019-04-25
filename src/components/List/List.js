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
        //collection: {...this.props.backingCollection}
        collection: {}
    }

    componentDidMount () {
        console.log(this.props.decks);
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
        this.props.onSelect(payload);
    }

    render() {
        let listItems = this.props.decks.map(deck => {
            return (
                <ListItem
                    key={deck.key}
                    data={deck.data}
                    uniqueId={deck.key}
                    onDelete={this.handle_onDeleteClick}
                    onEdit={this.handle_onEditClick}
                    onSelect={this.handle_onItemSelect}/>
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