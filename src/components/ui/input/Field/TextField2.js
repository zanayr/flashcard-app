import React from 'react';

import styles from '../Input/Input.module.css';


const textField2 = (props) => {
    return (
        <div className={styles.Field}>
            <div>
                <label>{props.config.label}</label>
                <input
                    className={styles.Input}
                    {...props.config}
                    name={props.config.name || props.target}
                    placeholder={props.config.placeholder || props.config.label}
                    required={props.required ? true : false}
                    type='text'
                    tabIndex={props.config.tabIndex || -1}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}/>
                {props.children}
                <span><p>{props.config.maxLength - props.value.length}</p></span>
            </div>
        </div>
    );
}


export default textField2;