import React from 'react';

import CSS from './Input.module.css';

const input = (props) => {
    let element;
    let cssClasses = [CSS.form_input];
    console.log(!props.valid, props.validate, props.touched);
    if (!props.valid && props.validate && props.touched) {
        console.log("invalid!");
        cssClasses.push(CSS.invalid);
    }
    switch (props.config.type) {
        case ('textarea'):
            element = <textarea
                {...props.config}
                className={cssClasses.join(' ')}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            element = <select
                {...props.config}
                className={cssClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.config.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.display}
                    </option>
                ))}
            </select>
        case ('email'):
        case ('password'):
        case ('text'):
        default:
            element = <input
                {...props.config}
                className={cssClasses.join(' ')}
                value={props.value}
                onChange={props.changed}/>;
            break;
    }
    return (
        <div className={CSS.form_field}>
            <label className={CSS.form_label}>{props.label}</label>
            {element}
        </div>
    )
}

export default input;