import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';

import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import CreateForm from '../../components/form/Create/CreateForm';
import CardStack from '../../components/Stack/CardStack';
import Header from '../../components/Header/Header';

import styles from './Study.module.css';

class Study extends Component {
    state = {
        cards: [],
        aside: {
            state: asideTypes.CLOSED
        }
    }

    //  STATE SETTERS  ---------------------------------------------------  SETTERS  //
    //  Aside  --------------------------------------------------------------  Aside // 
    _closeAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: asideTypes.CLOSED
            }
        }));
    }
    _openAside (state) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: state
            }
        }));
    }
    _toggleAside (state) {
        if (this.state.aside.state !== asideTypes.CLOSED) {
            if (this.state.aside.state !== state) {
                this._openAside(state);
            } else {
                this._closeAside();
            }
        } else {
            this._openAside(state);
        }
    }

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
        this.props.delete_async('card', this.props.select_authToken, card);
        if (this.props.location.state.id) {
            let deck = this.props.select_deck;
            this.props.update_async('deck', this.props.select_authToken, {
                ...deck,
                member: deck.member.filter(id => id !== card.id)
            });
        }
    }


    //  EVENT HANDLERS  -----------------------------------------------------  E.H.  //
    //  Aside  --------------------------------------------------------------  Aside //
    handle_onNagivationToggle = () => {
        this._toggleAside(asideTypes.NAVIGATION);
        this._setAside({
            cancel: this.handle_onAsideClose
        });
    }
    handle_onAsideClose = () => {
        this._closeAside();
    }

    //  Cards  --------------------------------------------------------------  Cards //
    handle_onCardCreate = (card) => {
        this._addCard(card);
        this.props.add_async('card', this.props.select_authToken, card);
        if (this.props.location.state.id) {
            let deck = this.props.select_deck;
            this.props.update_async('deck', this.props.select_authToken, {
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
        console.log(this.props);
        return (
            <Aux>
                <main
                    className={styles.Study}
                    onClick={this.handle_onAsideClose}>
                    {/* <div>
                        <Header
                            actions={{
                                navigation: this.handle_onNagivationToggle
                            }}
                            back={'/0/deck/' + this.props.location.state.id}
                            state={headerTypes.NAVIGATION}/>
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
                    </div> */}
                </main>
                {/* <Aside2
                    actions={{}}
                    data={{}}
                    state={this.state.aside.state}/> */}
            </Aux>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_deck: select.deck(state, ownProps.location.state.id),
        select_authToken: select.authToken(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        delete_async: (store, token, card) => dispatch(actions.delete_async(store, token, card)),
        add_async: (store, token, card) => dispatch(actions.add_async(store, token, card)),
        update_async: (store, token, deck) => dispatch(actions.update_async(store, token, deck))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Study);