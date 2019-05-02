import React from 'react';

import IconButton from '../button/Icon/IconButton';

import AppCSS from '../../../App.module.css';
import ToolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    // const handle_onAClick = () => {
    //     props.onA();
    // }
    // const handle_onBClick = () => {
    //     props.onB();
    // }
    // const handle_onCClick = () => {
    //     props.onC();
    // }

    return (
        <div className={ToolbarCSS.Toolbar}>
            <div className={AppCSS.Inner}>
                <IconButton onClick={props.onA}>T</IconButton>
                <IconButton onClick={props.onB}>G</IconButton>
                <IconButton onClick={props.onC}>D</IconButton>
                <IconButton onClick={props.onD}>X</IconButton>
                <IconButton onClick={props.onE}>Y</IconButton>
            </div>
        </div>
    );
}

export default toolbar;