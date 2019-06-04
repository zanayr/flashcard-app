import React from 'react';

import styles from '../Input.module.css';


const editor = (props) => {
    const remaining = props.config.maxLength - props.value.length;
    let counterCSS = [styles.Counter];
    if (remaining < 4) {
        counterCSS.push(styles.Low);
    }
    return (
        <div className={styles.Field}>
            <div>
                <label>{props.label}</label>
                <textarea
                    className={styles.Input}
                    {...props.config}
                    placeholder={props.config.placeholder || props.config.label}
                    required={props.required ? true : false}
                    type='text'
                    tabIndex={props.config.tabIndex || -1}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}/>
                {props.children}
                <span className={counterCSS.join(' ')}><p>{props.config.maxLength - props.value.length}</p></span>
            </div>
        </div>
    );
}


export default editor;