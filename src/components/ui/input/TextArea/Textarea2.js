import React from 'react';

import styles from '../Input/Input.module.css';


const editor = (props) => {
    return (
        <div className={styles.Field}>
            <div>
                <label>{props.label}</label>
                <textarea
                    className={styles.Input}
                    {...props.config}
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


export default editor;