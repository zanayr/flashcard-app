import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AuthForm from '../../../components/forms/auth/AuthForm';

import CSS from './Auth.module.css';

class Auth extends Component {
    render() {
        return (
            <main className={CSS.auth_open}>
                <div className={CSS.auth_inner}>
                    <AuthForm/>
                </div>
            </main>
        );
    }
}

export default Auth;