import React from 'react';

import PillButton from '../button/pill/PillButton';

import quickActionCSS from './QuickAction.module.css';

const quickAction = (props) => {
    function onStudy() {
        console.log("Study Clicked");
    }
    function onCreate() {
        console.log("Create Clicked")
    }
    function onQucikActionClicked() {
        if (props.quickActionState) {
            onStudy();
        } else {
            onCreate();
        }
    }

    let value = "Create";
    if (props.quickActionState) {
        value = "Study"
    }

    return (
        <PillButton
            className={quickActionCSS.Quick_Action}
            onClick={onQucikActionClicked}>
            {value}
        </PillButton>
    );
}

export default quickAction;