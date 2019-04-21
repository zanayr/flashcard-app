import React from 'react';

import InputCSS from './Input.module.css';

const input = (props) => {
    let element;
    let inputClasses = [InputCSS.Input];
    console.log(!props.valid && props.validate && props.touched);
    if (!props.valid && props.validate && props.touched) {
        inputClasses.push(InputCSS.Invalid);
    }
    switch (props.config.type) {
        case ('textarea'):
            element = <textarea
                {...props.config}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.onChange}/>;
            break;
        case ('select'):
            element = <select
                {...props.config}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.onChange}>
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
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.onChange}/>;
            break;
    }
    return (
        <div className={InputCSS.Field}>
            <label className={InputCSS.Label}>{props.label}</label>
            {element}
        </div>
    )
}

export default input;