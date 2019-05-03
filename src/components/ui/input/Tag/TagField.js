import React from 'react';

import InputCSS from '../Input/Input.module.css';


const tagField = (props) => {
    return (
        <div className={InputCSS.Field}>
            <label>{props.label}</label>
            <input
                className={InputCSS.Text_Field}
                maxLength={24}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.placeholder}
                type='text'
                value={props.value}/>
        </div>
    );
}


export default tagField;