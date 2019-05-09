import React from 'react';

import InputCSS from '../Input/Input.module.css';


const textField = (props) => {
    const handle_onChange = (e) => {
        props.onChange(props.target, e.target.value);
    }
    let input = (
        <input
                className={InputCSS.Text_Field}
                onChange={(e) => handle_onChange(e)}
                type='text'
                {...props.config}/>
    );
    if (props.required) {
        input = (
            <input
                className={InputCSS.Text_Field}
                onChange={(e) => handle_onChange(e)}
                type='text'
                required
                {...props.config}/>
        );
    }

    return (
        <div className={InputCSS.Field}>
            <div>
                <label>{props.config.label}</label>
                {input}
                <span><p>{props.config.maxLength - props.config.value.length}</p></span>
            </div>
        </div>
    );
}


export default textField;