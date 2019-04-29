import React, {Component} from 'react';

import Column from '../../../hoc/Column/Column';
import Input from '../../ui/input/Input/Input';
import TextField from '../../ui/input/Field/TextField';
import TextArea from '../../ui/input/TextArea/TextArea';
import Button from '../../ui/button/Button/Button';

import AppCSS from '../../../App.module.css';
import QuickInspectFormCSS from './QuickForm.module.css';

class QuickInspectForm extends Component {
    state = {
        title: this.props.data.title,
        details: this.props.data.details
    }

    form = React.createRef();

    //  Methods  //
    update (target, value) {
        this.setState(previous => ({
            ...previous,
            [target]: value
        }), () => {

        });
    }
    validate () {
        return this.form.current.reportValidity();
    }

    //  Event Handlers  //
    handle_onChange = (target, value) => {
        this.update(target, value);
        this.props.actions.onChange(this.props.data.id, target, value);
    }
    handle_onFormConfirm = () => {
        if (this.validate()) {
            this.props.actions.onConfirm({
                data: {
                    details: this.state.details,
                    title: this.state.title
                }
            });
        }
    }

    render () {
        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                ref={this.form}>
                <div className={AppCSS.Inner}>
                    <TextField
                        config={{
                            label: 'Title',
                            maxLength: 64,
                            minLength: 6,
                            placeholder: 'Title',
                            value: this.state.title
                        }}
                        key='title'
                        onChange={this.handle_onChange}
                        required
                        target='title'/>
                    <TextArea
                        config={{
                            label: 'Details',
                            maxLength: 64,
                            placeholder: 'Details',
                            value: this.state.details
                        }}
                        key='details'
                        onChange={this.handle_onChange}
                        target='details'/>
                    <Button
                        key='submit'
                        onClick={this.handle_onFormConfirm}
                        type='submit'>
                        Save
                    </Button>
                </div>
            </form>
        );
    }
}

export default QuickInspectForm;