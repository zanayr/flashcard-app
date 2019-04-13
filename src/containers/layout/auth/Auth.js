import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AuthForm from '../../../components/forms/auth/AuthForm';

import GlobalCSS from '../../../Global.module.css';
import AuthCSS from './Auth.module.css';

class Auth extends Component {
    render() {
        return (
            <main className={AuthCSS.Open}>
                <div className={GlobalCSS.Inner}>
                    <AuthForm/>
                </div>
            </main>
        );
    }
}

export default Auth;