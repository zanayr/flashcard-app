import React from 'react';

import PillButton from '../Pill/PillButton';

import style from '../Button.module.css';

const actionButton = (props) => {
    let value = props.values[0];
    if (props.state) {
        value = props.values[1];
    }

    const handle_onClick = () => {
        props.onClick(props.state);
    }

    return (
        <PillButton
            className={style.Action}
            onClick={handle_onClick}>
            {value}
        </PillButton>
    );
}

export default actionButton;