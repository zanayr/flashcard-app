import React from 'react';

import TextField from '../../ui/input/Field/TextField';
import styles from './AuthForm.module.css';


const signUpForm = (props) => {
    return (
        <form
            className={styles.SignUpForm}
            ref={props.reference}>
            <div>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'first',
                        name: 'first',
                        tabIndex: 1,
                        type: 'text'
                    }}
                    key={'first'}
                    required
                    value={props.data.first}
                    onChange={(value) => props.onChange('first', value)}/>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'last',
                        name: 'last',
                        tabIndex: 2,
                        type: 'text'
                    }}
                    key={'last'}
                    required
                    value={props.data.last}
                    onChange={(value) => props.onChange('last', value)}/>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'email',
                        name: 'email',
                        tabIndex: 3,
                        type: 'email'
                    }}
                    key={'email'}
                    required
                    value={props.data.email}
                    onChange={(value) => props.onChange('email', value)}/>
                <div className={styles.FormBreak}></div>
                <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'password',
                        minLength: 6,
                        name: 'password',
                        tabIndex: 4,
                        type: 'password'
                    }}
                    key={'password'}
                    required
                    value={props.data.password}
                    onChange={(value) => props.onChange('password', value)}/>
                 <TextField
                    config={{
                        autoComplete: 'off',
                        label: 'repeat password',
                        minLength: 6,
                        name: 'repeat',
                        tabIndex: 5,
                        type: 'password'
                    }}
                    key={'repeat'}
                    required
                    value={props.data.repeat}
                    onChange={(value) => props.onChange('repeat', value)}/>
            </div>
        </form>
    );
}


export default signUpForm;