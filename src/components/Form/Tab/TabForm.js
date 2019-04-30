import React, {Component} from 'react';

import TextField from '../../ui/input/Field/TextField';
import Button from '../../ui/button/Button/Button';

import styles from './TabForm.module.css';

class TabForm extends Component {
    state = {
        name: ''
    }


    form = React.createRef();

    
    validate () {
        return this.form.current.reportValidity();
    }

    handle_onChange = (target, value) => {
        this.setState(prev => ({
            ...prev,
            [target]: value
        }));
    }
    handle_onFormConfirm = () => {
        if (this.validate()) {
            this.props.onConfirm({
                name: this.state.name
            });
        }
    }

    render () {
        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                ref={this.form}>
                <div>
                    <TextField
                        config={{
                            label: 'Tab Name',
                            maxLength: 32,
                            minLength: 3,
                            placeholder: 'Tab Name',
                            value: this.state.name
                        }}
                        key='name'
                        onChange={this.handle_onChange}
                        required
                        target='name'/>
                    <Button
                        key='add'
                        onClick={this.handle_onFormConfirm}
                        type='submit'>
                        Add
                    </Button>
                </div>
            </form>
        );
    }
}

export default TabForm;