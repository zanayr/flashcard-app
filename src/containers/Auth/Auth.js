import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';

import Aux from '../../hoc/Aux/Aux';
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
        }));
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
        const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = true;
        if (this.state.state) {
            if (!this.state.form.first.length && valid) {
                valid = false;
            }
            if (!this.state.form.last.length && valid) {
                valid = false;
            }
            if (!this.state.form.email.length && this.state.form.email.match(email) && valid) {
                valid = false;
            }
            if (!this.state.form.password.length && valid) {
                valid = false;
            } else if (!this.state.form.password === this.state.form.repeat && valid) {
                valid = false;
            }
        } else {
            if (!this.state.form.email.length && this.state.form.email.match(email) && valid) {
                valid = false;
            }
            if (!this.state.form.password.length && valid) {
                valid = false;
            }
        }
        return valid;
    }


    handle_onChange = (target, value) => {
        this.changeFormValue(target, value);
        this.setValid(this._checkValidity());
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
        content = (
            <Aux>
                {form}
                <div>
                    <div>
                        <Button
                            disabled={!this.state.valid}
                            onClick={this.handle_onConfirmClick}>Confirm</Button>
                        <Button onClick={this.handle_onFormToggle}>{this.state.toggle[this.state.state]}</Button>
                    </div>
                </div>
            </Aux>
        );
        if (this.props.select_authLoading) {
            content = (<Throbber/>);
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
        select_authLoading: select.authIsLoading(state)
    };
}
const mapDispatchToProps = dispatch => {
    return {
        authSignIn_async: (data) => dispatch(actions.authSignIn_async(data)),
        authSignUp_async: (data) => dispatch(actions.authSignUp_async(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);