import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Column from '../../structure/column/Column';
import Row from '../../structure/row/Row';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';

import * as actions from '../../../store/actions/index';

import GlobalCSS from '../../../Global.module.css';
import AuthFormCSS from './AuthForm.module.css';

class AuthForm extends Component {
    state = {
        form: {
            email: {
                config: {
                    placeholder: 'Email Address',
                    type: 'email'
                },
                label: 'User Email',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                value: ''
            },
            password: {
                config: {
                    placeholder: 'Password',
                    type: 'password'
                },
                label: 'User Password',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                },
                value: ''
            }
        },
        valid: false,
        isSignUp: true
    }

    validate(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    _modeToggle = () => {
        this.setState(prev => ({
            ...prev,
            isSignUp: !prev.isSignUp
        }));
    }

    handle_change = (e, id) => {
        const updatedForm = {
            ...this.state.form,
            [id]: {
                ...this.state.form[id],
                value: e.target.value,
                valid: this.validate(e.target.value, this.state.form[id].validation),
                touched: true
            }
        };

        let isFormValid = true;
        for (let id in updatedForm) {
            isFormValid = updatedForm[id].valid && isFormValid;
        }

        this.setState({form: updatedForm, valid: isFormValid});
    }

    handle_onSubmitClicked = () => {
        this.props.onAuth(
            this.state.form.email.value,
            this.state.form.password.value,
            this.state.isSignUp
        );
    }
    handle_onModeClicked = () => {
        this._modeToggle();
    }

    render() {
        const formArray = [];
        for (let key in this.state.form) {
            formArray.push({
                config: this.state.form[key],
                id: key
            });
        }
        return (
            <form className={AuthFormCSS.Auth_Form}>
                <div className={GlobalCSS.Inner}>
                    <Column just="Between">
                        <div className={AuthFormCSS.Top}>
                            {
                                formArray.map(input => (
                                    <Input
                                        onChange={(e) => this.handle_change(e, input.id)}
                                        config={input.config.config}
                                        label={input.config.label}
                                        key={input.id}
                                        touched={input.config.touched}
                                        validate={input.config.validation}
                                        valid={input.config.valid}
                                        value={input.config.value}/>
                                ))
                            }
                        </div>
                        {this.props.error ? <p>{this.props.error.message}</p> : <p>Please enter credintials</p>}
                        <Row>
                            <Link to="/">Forget Something?</Link>
                            <Button
                                disabled={!this.state.valid}
                                key="submit"
                                onClick={this.handle_onSubmitClicked}
                                type="submit">
                                Sign Up
                            </Button>
                            <Button
                                onClick={this.handle_onModeClicked}
                                key="mode"
                                type="button">
                                Switch to {this.state.isSignUp ? 'Login' : 'Sign Up'}
                            </Button>
                        </Row>
                    </Column>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth_async(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);