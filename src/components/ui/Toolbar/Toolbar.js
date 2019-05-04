import React from 'react';

import IconButton from '../button/Icon/IconButton';

import AppCSS from '../../../App.module.css';
import ToolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <div className={ToolbarCSS.Toolbar}>
            <div className={AppCSS.Inner}>
                <IconButton onClick={props.onA}>T</IconButton>
                <IconButton onClick={props.onB}>G</IconButton>
                <IconButton onClick={props.onC}>D</IconButton>
                <IconButton
                    disabled={!props.merge}
                    onClick={props.onD}>M</IconButton>
                <IconButton
                    disabled={!props.clone}
                    onClick={props.onE}>C</IconButton>
                <IconButton onClick={props.onAA}>AA</IconButton>
                <IconButton onClick={props.onAD}>AD</IconButton>
                <IconButton onClick={props.onDA}>DA</IconButton>
                <IconButton onClick={props.onDD}>DD</IconButton>
            </div>
        </div>
    );
}

export default toolbar;