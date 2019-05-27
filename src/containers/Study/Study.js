import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';
import * as utility from '../../utility/utility';

import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import CardStack from '../../components/Stack/CardStack';
import Header from '../../components/Header/Header';

import styles from './Study.module.css';

class Study extends Component {
    state = {
        all: {},
        aside: {
            state: asideTypes.CLOSED,
            actions: {}
        },
        cards: [],
        current: 0,
        display: []
    }

    componentDidMount () {
        const cards = this.props.select_cardsById;
        this.setState(prev => ({
            ...prev,
            all: this.props.select_cards,
            cards: utility.shuffle(cards),
            display: [cards[this.state.current]]
        }));
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
    setAside (actions) {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                actions: actions
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
    setCard (card) {
        const display = this.state.display.slice();
        display[card.id] = card;
        this.setState(prev => ({
            ...prev,
            display: display
        }));
    }
    setNextCard () {
        const current = this.state.current + 1;
        this.setState(prev => ({
            ...prev,
            current: current,
            display: prev.display.concat(this.state.cards[current])
        }));
    }


    //  EVENT HANDLERS  -----------------------------------------------------  E.H.  //
    //  Aside  --------------------------------------------------------------  Aside //
    handle_onNagivationToggle = () => {
        this._toggleAside(asideTypes.NAVIGATION);
        this.setAside({
            overlay: this.handle_onAsideClose
        });
    }
    handle_onAsideClose = () => {
        this._closeAside();
    }

    //  Cards  --------------------------------------------------------------  Cards //
    handle_onCardClick = () => {
        if (this.state.current + 1 < this.state.cards.length) {
            this.setNextCard();
        } else {
            console.log('end');
        }
    }

    handle_onCardFlag = (card) => {
        const model = this.state.all[card.id];
        card.flagged = !card.flagged ? true : null;
        this.setCard(card);
        this.props.update_async('card', this.props.select_authToken, {
            ...model,
            meta: {
                ...model.meta,
                flagged: card.flagged
            }
        });
    }


    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        return (
            <Aux>
                <main
                    className={styles.Study}
                    onClick={this.handle_onAsideClose}>
                    <div>
                        <Header
                            actions={{
                                navigation: this.handle_onNagivationToggle
                            }}
                            state={headerTypes.NAVIGATION}/>
                        <section className={styles.Board}>
                            <div>
                                <div className={styles.Wrapper}>
                                    <CardStack
                                        collection={this.state.display}
                                        max={1}
                                        onAction={this.handle_onCardFlag}
                                        onClick={this.handle_onCardClick}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <Aside2
                    actions={this.state.aside.actions}
                    data={{}}
                    state={this.state.aside.state}/>
            </Aux>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_cards: select.cards(state),
        select_cardsById: select.cardsById(state, ownProps.location.state.data),
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