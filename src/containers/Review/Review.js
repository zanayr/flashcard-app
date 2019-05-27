import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';
import * as utility from '../../utility/utility';

import ActionButton from '../../components/ui/button/Action/ActionButton';
import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import CardStack from '../../components/Stack/CardStack';
import Header from '../../components/Header/Header';

import styles from './Review.module.css';

class Review extends Component {
    state = {
        aside: {
            state: asideTypes.CLOSED,
            actions: {}
        }
    }
    // componentDidMount () {
    //     const cards = this.props.select_cardsById;
    //     const shuffled = utility.shuffle(Object.keys(cards).map(id => {return cards[id]}));
    //     this.setState(prev => ({
    //         ...prev,
    //         all: this.props.select_cards,
    //         card: cards,
    //         display: [shuffled[this.state.current]],
    //         shuffled: shuffled,
    //         timestamp: Date.now(),
    //         total: shuffled.length
    //     }));
    // }

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


    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        console.log(this.props.location.state);
        return (
            <Aux>
                <main
                    className={styles.Review}
                    onClick={this.handle_onAsideClose}>
                    <div>
                        <Header
                            actions={{
                                navigation: this.handle_onNagivationToggle
                            }}
                            state={headerTypes.NAVIGATION}/>
                        <section className={styles.Board}>
                            <div>
                                <h1>Reiview</h1>
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


export default Review;
// const mapStateToProps = (state, ownProps) => {
//     return {
//         select_cards: select.cards(state),
//         select_cardsById: select.cardsById(state, ownProps.location.state.data),
//         select_authToken: select.authToken(state)
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         delete_async: (store, token, card) => dispatch(actions.delete_async(store, token, card)),
//         add_async: (store, token, card) => dispatch(actions.add_async(store, token, card)),
//         update_async: (store, token, deck) => dispatch(actions.update_async(store, token, deck))
//     };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(Review);