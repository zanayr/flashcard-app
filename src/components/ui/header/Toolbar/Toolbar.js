import React from 'react';

import IconButton from '../../button/icon/IconButton';

import GlobalCSS from '../../../../Global.module.css';
import ToolbarCSS from './Toolbar.module.css';

const toolbar = (props) => {
    const handle_onAClicked = () => {
        const data = {
            data: {},
            state: 2
        }

        props.onA(data);
    }
    const handle_onBClicked = () => {
        const data = {
            data: {},
            state: 3
        }

        props.onB(data);
    }

    return (
        <div className={ToolbarCSS.Toolbar}>
            <div className={GlobalCSS.Inner}>
                <IconButton onClick={handle_onAClicked}>A</IconButton>
                <IconButton onClick={handle_onBClicked}>B</IconButton>
            </div>
        </div>
    );
}

export default toolbar;