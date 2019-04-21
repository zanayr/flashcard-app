import React, {Component} from "react";

import Column from "../../structure/column/Column";
import Input from "../../ui/input/Input";

import globalCSS from "../../../Global.module.css";
import quickEditCSS from "./QuickEdit.module.css";

class QuickEdit extends Component {
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
        this.setState(prev => ({
            ...prev,
            form: form,
            valid: valid
        }), () => {
            this.props.onChange(this.props.data.id, label, value);
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

        this._formUpdate(form, isValid, label, e.target.value);
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
            <form className={quickEditCSS.QucikEdit_Form}>
                <div className={globalCSS.Inner}>
                    <Column just="Between">
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
                    </Column>
                </div>
            </form>
        );
    }
}

export default QuickEdit;