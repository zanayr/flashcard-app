import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import Button from '../../components/ui/button/Button/Button';
import SignUpForm from '../../components/form/Auth/SignUpForm';
import SignInForm from '../../components/form/Auth/SignInForm';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        form: {
            email: '',
            first: '',
            last: '',
            password: '',
            repeat: ''
        },
        state: 0,
        toggle: ['Sign Up', 'Sign In'],
        valid: false
    }
    form = React.createRef();

    changeFormValue (target, value) {
        this.setState(prev => ({
            ...prev,
            form: {
                ...prev.form,
                [target]: value
            }
        }), () => {
            this.setValid(this._checkValidity());
        });
    }
    setValid (valid) {
        this.setState(prev => ({
            ...prev,
            valid: valid
        }));
    }
    toggleState () {
        this.setState(prev => ({
            ...prev,
            state: 1 - this.state.state
        }));
    }


    _checkValidity () {
        let valid = true;
        if (this.state.state) {
            if (!this.state.form.first.length && valid) {
                valid = false;
            }
            if (!this.state.form.last.length && valid) {
                valid = false;
            }
            if (!this.state.form.email.length && valid) {
                valid = false;
            }
            if (this.state.form.password.length < 6 && valid) {
                valid = false;
            }
            if (this.state.form.repeat.length < 6 && !(this.state.form.repeat === this.state.form.password) && valid) {
                valid = false;
            }
        } else {
            if (!this.state.form.email.length && valid) {
                valid = false;
            }
            if (this.state.form.password.length < 6 && valid) {
                valid = false;
            }
        }
        return valid;
    }


    handle_onChange = (target, value) => {
        this.changeFormValue(target, value);
    }
    handle_onConfirmClick = () => {
        if (this.form.current.reportValidity() && this.state.valid) {
            if (this.state.state) {
                this.props.authSignUp_async(this.state.form);
            } else {
                this.props.authSignIn_async(this.state.form);
            }
        }
    }
    handle_onFormToggle = () => {
        this.toggleState();
        this.setValid(false);
        this.changeFormValue('password', '');
        this.changeFormValue('repeat', '');
    }

    render() {
        let form = (null);
        let content = (null);
        let labels = ['Log In', 'Confirm'];
        let greeting = 'Please log in or sign up!';
        let greetingCSS = '';
        if (this.state.state) {
            form = (
                <SignUpForm
                    data={{
                        email: this.state.form.email,
                        password: this.state.form.password
                    }}
                    reference={this.form}
                    onChange={this.handle_onChange}/>
            );
        } else {
            form = (
                <SignInForm
                    data={{
                        email: this.state.form.email,
                        first: this.state.form.first,
                        last: this.state.form.last,
                        password: this.state.form.password,
                        repeat: this.state.form.repeat
                    }}
                    reference={this.form}
                    onChange={this.handle_onChange}/>
            );
        }
        if (this.props.select_error) {
            switch (this.props.select_error.code) {
                case 404:
                    greeting = 'Opps, bad connection, please try again.';
                    break;
                case 400:
                    greeting = 'Opps, something wasn\'t correct, please try again.';
                    break;
                default:
                    greeting = 'Opps, something went wrong, please try again.';
                    break;
            }
            greetingCSS = styles.Error;
        }
        content = (
            <div className={styles.Form}>
                <div>
                    <p className={greetingCSS}>{greeting}</p>
                    {form}
                    <div className={styles.Interface}>
                        <div>
                            <Button
                                disabled={!this.state.valid}
                                onClick={this.handle_onConfirmClick}>{labels[this.state.state]}</Button>
                            <Button onClick={this.handle_onFormToggle}>{this.state.toggle[this.state.state]}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
        if (this.props.select_authLoading) {
            content = (<Throbber className={styles.Throbber}/>);
        }
        if (this.props.authenticated) {
            content = (<Redirect to="/in"/>);
        }
        return (
            <main className={styles.Auth}>
                <div>
                    {content}
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: select.authToken(state) !== null,
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_authLoading: select.authIsLoading(state),
        select_error: select.authError(state)
    };
}
const mapDispatchToProps = dispatch => {
    return {
        authSignIn_async: (data) => dispatch(actions.authSignIn_async(data)),
        authSignUp_async: (data) => dispatch(actions.authSignUp_async(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);