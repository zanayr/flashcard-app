import React from 'react';

import styles from '../Input.module.css';


const countingTextField = (props) => {
    const remaining = props.config.maxLength - props.value.length;
    let counterCSS = [styles.Counter];
    if (remaining < 4) {
        counterCSS.push(styles.Low);
    }
    return (
        <div className={styles.Field}>
            <div>
                <label>{props.config.label}</label>
                <input
                    className={props.className}
                    {...props.config}
                    name={props.config.name || props.target}
                    placeholder={props.config.placeholder || props.config.label}
                    required={props.required ? true : false}
                    type={props.config.type || 'text'}
                    tabIndex={props.config.tabIndex || -1}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}/>
                {props.children}
                <span className={counterCSS.join(' ')}><p>{remaining}</p></span>
            </div>
        </div>
    );
}


export default countingTextField;