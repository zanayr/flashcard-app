import React, {Component} from 'react';

import Column from '../../structure/column/Column';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';

import GlobalCSS from '../../../Global.module.css';
import QuickInspectFormCSS from './QuickForm.module.css';

class QuickInspectForm extends Component {
    state = {
        form: {
            title: {
                config: {
                    placeholder: 'Title',
                    type: 'text'
                },
                label: 'Collection Title',
                touched: false,
                valid: true,
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 48
                }
            },
            details: {
                config: {
                    placeholder: 'Details',
                    type: 'textarea'
                },
                label: 'Collection Details',
                touched: false,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 64
                }
            }
        },
        valid: true
    }

    _formValidate(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    _formUpdate = (form, valid, label, value) => {
        const payload = {
            data: {
                id: this.props.data.key,
                property: label,
                value: value
            }
        }
        this.setState(previousState => ({
            ...previousState,
            form: form,
            valid: valid
        }), () => {
            this.props.actions.onChange(payload);
        });
    }

    handle_onChange = (e, label) => {
        const form = {
            ...this.state.form,
            [label]: {
                ...this.state.form[label],
                touched: true,
                value: e.target.value,
                valid: this._formValidate(e.target.value, this.state.form[label].validation)
            }
        };

        let isValid = true;
        for (let key in form) {
            isValid = form[key].valid && isValid;
        }
        //console.log(form, isValid, label, e.target.value);
        this._formUpdate(form, isValid, label, e.target.value);
    }
    handle_onSubmit = () => {
        this.props.actions.onSubmit({
            data: {
                details: this.props.data.details,
                title: this.props.data.title,
                userId: this.props.data.userId
            },
            key: this.props.data.key
        });
    }

    render() {
        const form = [];
        for (let formKey in this.state.form) {
            form.push({
                config: this.state.form[formKey],
                id: formKey
            });
        }
        return (
            <form className={QuickInspectFormCSS.Quick_Inspect_Form}>
                <div className={GlobalCSS.Inner}>
                    <Column just='Between'>
                        {
                            form.map(input => (
                                    <Input
                                        config={input.config.config}
                                        label={input.config.label}
                                        key={input.id}
                                        onChange={(e) => this.handle_onChange(e, input.id)}
                                        touched={input.config.touched}
                                        validate={input.config.validation}
                                        valid={input.config.valid}
                                        value={this.props.data[input.id]}/>
                            ))
                        }
                        <Button
                            disabled={!this.state.valid}
                            key="submit"
                            onClick={this.handle_onSubmit}
                            type="submit">
                            Save
                        </Button>
                    </Column>
                </div>
            </form>
        );
    }
}

export default QuickInspectForm;