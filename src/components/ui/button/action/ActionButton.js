import React from 'react';

import PillButton from '../Pill/PillButton';

import ActionButtonCSS from './ActionButton.module.css';

const actionButton = (props) => {
    let value = props.values[0];
    if (props.state) {
        value = props.values[1];
    }

    const handle_onClick = () => {
        props.onClick();
    }

    return (
        <PillButton
            className={ActionButtonCSS.Action_Button}
            onClick={handle_onClick}>
            {value}
        </PillButton>
    );
}

export default actionButton;