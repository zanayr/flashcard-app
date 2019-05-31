import React from 'react';

import TextField from '../../ui/input/Field/TextField';
import styles from './AuthForm.module.css';


const signInForm = (props) => {
    return (
        <form
            className={styles.SignInForm}
            ref={props.reference}>
            <div>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'email',
                        name: 'email',
                        tabIndex: 1,
                        type: 'email'
                    }}
                    key={'email'}
                    required
                    value={props.data.email}
                    onChange={(value) => props.onChange('email', value)}/>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'password',
                        name: 'password',
                        tabIndex: 2,
                        type: 'password'
                    }}
                    key={'password'}
                    required
                    value={props.data.password}
                    onChange={(value) => props.onChange('password', value)}/>
            </div>
        </form>
    );
}


export default signInForm;