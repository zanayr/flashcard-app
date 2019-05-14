import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import CreateForm from '../../components/form/Create/CreateForm';
import CardStack from '../../components/Stack/CardStack';

import styles from './Create.module.css';

class Create extends Component {
    state = {
        cards: []
    }

    //  STATE SETTERS  ---------------------------------------------------  SETTERS  //
    //  Cards  --------------------------------------------------------------  Cards //
    _addCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.concat(card)
        }));
    }
    _removeCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.filter(c => c.id !== card.id)
        }));
        this.props.deleteCard_async(this.props.select_token, card);
        if (typeof this.props.location.state.id !== undefined) {
            let deck = this.props.select_deck;
            this.props.updateDeck_async(this.props.select_token, {
                ...deck,
                member: deck.member.filter(id => id !== card.id)
            });
        }
    }

    //  EVENT HANDLERS  -----------------------------------------------------  E.H.  //
    //  Cards  --------------------------------------------------------------  Cards //
    handle_onCardCreate = (card) => {
        this._addCard(card);
        this.props.addCard_async(this.props.select_token, card);
        if (typeof this.props.location.state.id !== undefined) {
            let deck = this.props.select_deck;
            this.props.updateDeck_async(this.props.select_token, {
                ...deck,
                member: deck.member.concat(card.id)
            });
        }
    }
    handle_onCardDelete = (card) => {
        this._removeCard(card);
    }

    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        return (
            <main className={styles.Creator}>
                <div>
                    <section className={styles.Editor}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CreateForm
                                    deck={this.props.location.state.id}
                                    onCreate={this.handle_onCardCreate}/>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Board}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CardStack
                                    collection={this.state.cards}
                                    max={21}
                                    onAction={this.handle_onCardDelete}/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_deck: select.deck(state, ownProps.location.state.id),
        select_token: select.authToken(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteCard_async: (token, card) => dispatch(actions.deleteCard_async(token, card)),
        addCard_async: (token, card) => dispatch(actions.addCard_async(token, card)),
        updateDeck_async: (token, deck) => dispatch(actions.updateDeck_async(token, deck))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Create);