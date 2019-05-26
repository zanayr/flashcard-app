import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as asideTypes from '../../components/aside/Aside/asideTypes';
import * as headerTypes from '../../components/Header/types.js';

import Aside2 from '../../components/aside/Aside/Aside2';
import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import ProfileForm from '../../components/form/Profile/ProfileForm';

import styles from './Profile.module.css';

class Profile extends Component {
    state = {
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

    //  User  --------------------------------------------------------------  User //
    _updateUser (card) {
        //  Do stuff
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

    handle_onFormConfirm = (user) => {
        this.props.update_async('user', this.props.select_authToken, user);
        this.props.history.replace('/2/user');
    }


    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
    render () {
        return (
            <Aux>
                <main
                    className={styles.Profile}
                    onClick={this.handle_onAsideClose}>
                    <div>
                        <Header
                            actions={{
                                navigation: this.handle_onNagivationToggle
                            }}
                            back={'/2/user'}
                            state={headerTypes.NAVIGATION}/>
                        <section className={styles.Editor}>
                            <div>
                                <div className={styles.Wrapper}>
                                    <ProfileForm
                                        user={this.props.select_user}
                                        onConfirm={this.handle_onFormConfirm}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <Aside2
                    actions={{}}
                    data={{}}
                    state={this.state.aside.state}/>
            </Aux>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_user: select.userById(state, ownProps.match.params.id)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        update_async: (store, token, deck) => dispatch(actions.update_async(store, token, deck))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);