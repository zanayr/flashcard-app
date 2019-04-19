import React from 'react';

import PillButton from '../button/pill/PillButton';

import quickActionCSS from './QuickAction.module.css';

const quickAction = (props) => {
    let value = "Create";
    if (props.quickActionState) {
        value = "Study"
    }

    return (
        <PillButton
            className={quickActionCSS.Quick_Action}
            onClick={props.onClick}>
            {value}
        </PillButton>
    );
}

export default quickAction;