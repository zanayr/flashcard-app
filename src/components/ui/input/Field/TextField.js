import React from 'react';

import styles from '../Input.module.css';


const textField = (props) => {
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
                    type={props.config.type}
                    tabIndex={props.config.tabIndex || -1}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}/>
            </div>
        </div>
    );
}


export default textField;