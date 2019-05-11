import React from 'react';

import styles from '../Input/Input.module.css';


const tagField2 = (props) => {
    return (
        <div className={styles.Field}>
            <div>
                <label>{props.label}</label>
                <input
                    autoComplete={'off'}
                    className={styles.Input}
                    maxLength={24}
                    name='tag'
                    placeholder={props.label}
                    required
                    type='text'
                    tabIndex={props.tabIndex || -1}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}/>
                {props.children}
                <span><p>{24 - props.value.length}</p></span>
            </div>
        </div>
    );
}


export default tagField2;