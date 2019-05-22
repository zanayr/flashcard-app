import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import AuthForm from '../../components/form/Auth/AuthForm';

import AppCSS from '../../App.module.css';
import AuthCSS from './Auth.module.css';

class Auth extends Component {
    render() {
        let markup = (<AuthForm/>);
        if (this.props.select_isLoading) {
            markup = (
                <h1>Loading...</h1>
            );
        }
        if (this.props.isAuthenticated) {
            markup = (
                <Redirect to="/in"/>
            );
        }
        return (
            <main className={AuthCSS.Open}>
                <div className={AppCSS.Inner}>
                    {markup}
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_isLoading: select.authIsLoading(state),
        isAuthenticated: select.authToken(state) !== null
    };
}

export default connect(mapStateToProps, null)(Auth);