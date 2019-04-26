import React from 'react';

import IconButton from '../button/Icon/IconButton';

import AppCSS from '../../../App.module.css';
import ToolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    const handle_onAClick = () => {
        const data = {
            data: {},
            state: 2
        }

        props.onA(data);
    }
    const handle_onBClick = () => {
        const data = {
            data: {},
            state: 3
        }

        props.onB(data);
    }
    const handle_onCClick = () => {
        props.onC();
    }

    return (
        <div className={ToolbarCSS.Toolbar}>
            <div className={AppCSS.Inner}>
                <IconButton onClick={handle_onAClick}>A</IconButton>
                <IconButton onClick={handle_onBClick}>B</IconButton>
                <IconButton onClick={handle_onCClick}>D</IconButton>
            </div>
        </div>
    );
}

export default toolbar;