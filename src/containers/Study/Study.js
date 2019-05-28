import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';
import * as modalTypes from '../../components/modal/Modal/modalTypes';
import * as utility from '../../utility/utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import BarButton from '../../components/ui/button/Bar/BarButton';
import CardStack from '../../components/Stack/CardStack';
import Header from '../../components/Header/Header';

import styles from './Study.module.css';

class Study extends Component {
    state = {
        action: 0,
        all: {},
        aside: {
            state: asideTypes.CLOSED,
            actions: {}
        },
        card: {},
        current: 0,
        display: [],
        meta: {},
        shuffled: [],
        timestamp: 0,
        total: 0,
    }
    componentDidMount () {
        const cards = this.props.select_cardsById;
        const shuffled = utility.shuffle(Object.keys(cards).map(id => {return cards[id]}));
        this.setState(prev => ({
            ...prev,
            all: this.props.select_cards,
            card: cards,
            display: [shuffled[this.state.current]],
            shuffled: shuffled,
            timestamp: Date.now(),
            total: shuffled.length
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
    flagCard (value) {
        const display = this.state.display;
        display[this.state.current].meta = {
            flagged: value
        }
        this.setState(prev => ({
            ...prev,
            display: display
        }));
    }
    setDisplayCard (card) {
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
            display: prev.display.concat(this.state.shuffled[current]),
            timestamp: Date.now()
        }));
    }
    updateMeta_async (model, meta) {
        this.setState(prev => ({
            ...prev,
            card: {
                ...prev.card,
                [model.id]: {
                    ...model,
                    meta: meta
                }
            }
        }));
        this.props.update_async('card', this.props.select_authToken, {
            ...model,
            meta: meta
        });
    }
    //  Meta  ---------------------------------------------------------------  Meta  //
    setMeta (id, meta) {
        this.setState(prev => ({
            ...prev,
            meta: {
                ...prev.meta,
                [id]: meta
            }
        }));
    }

    //  State  -------------------------------------------------------------  State  //
    begin () {
        this.setState(prev => ({
            ...prev,
            action: 1
        }));
    }
    finish () {
        this.setState(prev => ({
            ...prev,
            action: 2
        }));
    }


    //  EVENT HANDLERS  -----------------------------------------------------  E.H.  //
    //  Action  -----------------------------------------------------------  Action  //
    handle_onActionClick = (action) => {
        switch (action) {
            case 0:
                const t = this.state.timestamp;
                this.props.displayModal_async(
                    modalTypes.WARNING,
                    'Are you sure you wish to leave this study session?',
                    'Leave', 'Cancel')
                .then(response => {
                    this.props.history.replace('/deck');
                })
                .catch(() => {}); // Eat cancel
                break;
            default:
                this.props.history.replace('/review', {data: this.state.card, meta: this.state.meta});
                break;
        }
    }
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
        if (!this.state.action - 1) {
            const card = this.state.card[this.state.display[this.state.current].id];
            const time = (Date.now() - this.state.timestamp);
            const count = card.meta.count + 1;
            const total = card.meta.time.total + time;
            const average = total / count;
            let meta = {
                ...card.meta,
                count: count,
                flagged: card.meta.flagged || null,
                time: {
                    average: average,
                    total: total
                }
            }
            this.setMeta(card.id, {time: time});
            this.updateMeta_async(card, meta);
            if (this.state.current + 1 < this.state.total) {
                this.setNextCard();
            } else {
                this.finish();
            }
        }
    }

    handle_onCardFlag = (card) => {
        const flag = !card.flagged ? true : null;
        this.flagCard(flag);
        this.updateMeta_async(this.state.card[card.id], {flagged: flag});
    }

    handle_onStartClick = () => {
        this.begin();
    }

    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        let content;
        if (this.state.action) {
            content = (
                <Aux>
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
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={this.state.action - 1}
                            values={['Exit', 'Review']}/>
                </Aux>
            );
        } else {
            const cards = this.state.card;
            let ms = 0;
            let total = 0;
            Object.keys(cards).forEach(id => {
                total++;
                ms = (cards[id].meta.time.average || 3000) + ms;
            });
            let minutes = Math.round(ms / 1000) / 60;
            if (minutes < 2) {
                minutes = '1 minute';
            } else {
                minutes = minutes + ' minutes';
            }
            content = (
                <section className={styles.Board}>
                    <div>
                        <h1>Get Ready!</h1>
                        <p>{'You will be studying ' + total + ' cards. It should take you around ' + minutes + ' to complete these. Good luck!'}</p>
                        <BarButton onClick={this.handle_onStartClick}>Start</BarButton>
                    </div>
                </section>
            );
        }
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
                        {content}
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
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel)),
        update_async: (store, token, deck) => dispatch(actions.update_async(store, token, deck))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Study);