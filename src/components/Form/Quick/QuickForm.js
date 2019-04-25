import React, {Component} from 'react';

import Column from '../../../hoc/Column/Column';
import Input from '../../ui/input/Input/Input';
import Button from '../../ui/button/Button/Button';

import AppCSS from '../../../App.module.css';
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
                },
                value: this.props.data.title
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
                },
                value: this.props.data.details
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
    _formUpdate = (form, valid, target, value) => {
        this.setState(previousState => ({
            ...previousState,
            form: form,
            valid: valid
        }), () => {
            this.props.actions.onChange(target, value);
        });
    }

    handle_onChange = (e, target) => {
        const form = {
            ...this.state.form,
            [target]: {
                ...this.state.form[target],
                touched: true,
                value: e.target.value,
                valid: this._formValidate(e.target.value, this.state.form[target].validation)
            }
        };

        let isValid = true;
        for (let key in form) {
            isValid = form[key].valid && isValid;
        }
        this._formUpdate(form, isValid, target, e.target.value);
    }
    handle_onSubmit = () => {
        this.props.actions.onSubmit({
            data: {
                details: this.state.form.details.value,
                title: this.state.form.title.value,
                userId: this.props.data.userId
            },
            key: this.props.data.key
        });
    }

    render() {
        const form = [];
        for (let label in this.state.form) {
            form.push({
                config: this.state.form[label],
                id: label
            });
        }
        return (
            <form className={QuickInspectFormCSS.Quick_Inspect_Form}>
                <div className={AppCSS.Inner}>
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
                                        value={input.config.value}/>
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