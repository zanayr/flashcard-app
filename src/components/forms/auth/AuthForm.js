import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Column from '../../structure/column/Column';
import Row from '../../structure/row/Row';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';

import CSS from './AuthForm.module.css';

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
                    required: true
                },
                value: ''
            },
            pass: {
                config: {
                    placeholder: 'Password',
                    type: 'password'
                },
                label: 'User Password',
                touched: false,
                valid: false,
                validation: {
                    required: true
                },
                value: ''
            }
        },
        valid: false
    }

    validate(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        console.log(isValid);
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        console.log(isValid);
        return isValid;
    }

    handle_change = (e, id) => {
        const updatedForm = {
            ...this.state.form
        };
        const updatedInput = {
            ...updatedForm[id]
        };
        updatedInput.value = e.target.value;
        updatedInput.valid = this.validate(updatedInput.value, updatedInput.validation);
        updatedInput.touched = true;
        updatedForm[id]  = updatedInput;

        let isFormValid = true;
        for (let id in updatedForm) {
            isFormValid = updatedForm[id].valid && isFormValid;
        }

        this.setState({form: updatedForm, valid: isFormValid});
    }
    handle_submit = (e) => {
        e.preventDefault();
        const data = {};
        for (let id in this.state.form) {
            data[id] = this.state.form[id].value;
        }
        const auth = {
            data: data
        };
        // post to server here
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
            <form className={CSS.form_open}
                onSubmit={this.handle_submit}>
                <div className={CSS.form_inner}>
                    <Column>
                        {
                            formArray.map(input => (
                                <Input
                                    changed={(e) => this.handle_change(e, input.id)}
                                    config={input.config.config}
                                    label={input.config.label}
                                    key={input.id}
                                    touched={input.config.touched}
                                    validate={input.config.validation}
                                    valid={input.config.valid}
                                    value={input.config.value}/>
                            ))
                        }
                        <div className={CSS.flex_grow}>
                        </div>
                        <Row>
                            <Link to="/">Forget Something?</Link>
                            <Button
                                type="submit"
                                disabled={!this.state.valid}>
                                Login
                            </Button>
                        </Row>
                    </Column>
                </div>
            </form>
        );
    }
}

export default AuthForm;