import React, {Component} from 'react';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';

import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import MetaGraph from '../../components/ui/Graph/Meta';

import styles from './Review.module.css';

class Review extends Component {
    state = {
        aside: {
            state: asideTypes.CLOSED,
            actions: {}
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
                                <h1>Session Review</h1>
                                <MetaGraph source={this.props.location.state}/>
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