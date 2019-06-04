import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as modalTypes from '../../components/modal/Modal/modalTypes';
import * as utility from '../../utility/utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/ui/button/Button/Button';
import FlashcardStack from '../../components/Stack/FlashcardStack';
import SimpleHeader from '../../components/Header/SimpleHeader';

import styles from './Study.module.css';

class Study extends Component {
    state = {
        action: 0,
        aside: {
            state: asideTypes.CLOSED,
            actions: {}
        },
        sesson: utility.createHashId(0),
        shuffled: [],
        state: 0
    }
    updated = false;

    componentDidMount () {
        const cards = this.props.select_cardsById;
        const shuffled = utility.shuffle(Object.keys(cards).map(id => {return cards[id]}));
        this.setState(prev => ({
            ...prev,
            shuffled: shuffled,
        }));
    }

    //  STATE SETTERS  ---------------------------------------------------  SETTERS  //
    //  Action  -----------------------------------------------------------  Action  //
    setAction (action) {
        this.setState(prev => ({
            ...prev,
            action: action
        }));
    }
    //  Aside  --------------------------------------------------------------  Aside // 
    closeAside () {
        this.setState(prev => ({
            ...prev,
            aside: {
                ...prev.aside,
                state: asideTypes.CLOSED
            }
        }));
    }
    openAside (state) {
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
    toggleAside (state) {
        if (this.state.aside.state !== asideTypes.CLOSED) {
            if (this.state.aside.state !== state) {
                this.openAside(state);
            } else {
                this.closeAside();
            }
        } else {
            this.openAside(state);
        }
    }
    //  State  -------------------------------------------------------------  State  //
    toggleState () {
        this.setState(prev => ({
            ...prev,
            state: 1 - prev.state
        }));
    }


    _updateCard_async (card) {
        this.props.update_async('card', this.props.select_authToken, card);
    }


    //  EVENT HANDLERS  -----------------------------------------------------  E.H.  //
    //  Action  -----------------------------------------------------------  Action  //
    handle_onActionClick = (action) => {
        switch (action) {
            case 0:
                this.props.displayModal_async(
                    modalTypes.WARNING,
                    'Are you sure you wish to leave this study session?',
                    'Leave', 'Cancel')
                .then(response => {
                    this.props.history.replace('/0/deck');
                })
                .catch(() => {}); // Eat cancel
                break;
            default:
                this.props.history.replace('/0/deck');
                break;
        }
    }
    //  Aside  --------------------------------------------------------------  Aside //
    handle_onNagivationToggle = () => {
        this.toggleAside(asideTypes.NAVIGATION);
        this.setAside({
            overlay: this.handle_onAsideClose
        });
    }
    handle_onAsideClose = () => {
        this.closeAside();
    }

    //  Cards  --------------------------------------------------------------  Cards //
    handle_onCardFlag = (flagged) => {
        this._updateCard_async(flagged);
    }
    handle_onComplete = (complete) => {
        this.setAction(complete);
    }
    handle_onMetaUpdate = (card, meta) => {
        card.meta = {
            ...card.meta,
            [this.state.sesson]: meta
        }
        this._updateCard_async(card);
    }
    handle_onStartClick = () => {
        this.toggleState();
    }

    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        let content;
        if (this.state.state) {
            content = (
                <Aux>
                    <section className={styles.Board}>
                            <div>
                                <div className={styles.Wrapper}>
                                    <FlashcardStack
                                        actions={{
                                            change: this.handle_onComplete,
                                            flag: this.handle_onCardFlag,
                                            update: this.handle_onMetaUpdate
                                        }}
                                        collection={this.state.shuffled}/>
                                </div>
                            </div>
                        </section>
                        <ActionButton
                            onClick={this.handle_onActionClick}
                            state={this.state.action}
                            values={['Exit', 'Finish']}/>
                </Aux>
            );
        } else {
            content = (
                <section className={styles.Greeting}>
                    <div>
                        <div className={styles.Wrapper}>
                            <h3>Get Ready!</h3>
                            <p>{'You will be studying ' + this.state.shuffled.length + ' cards. Good luck!'}</p>
                            <Button onClick={this.handle_onStartClick}>Start</Button>
                        </div>
                    </div>
                </section>
            );
        }
        return (
            <Aux>
                <main
                    className={styles.Main}
                    onClick={this.handle_onAsideClose}>
                    <div>
                        <SimpleHeader
                            actions={{
                                navigation: this.handle_onNagivationToggle
                            }}/>
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
        update_async: (store, token, model) => dispatch(actions.update_async(store, token, model))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Study);