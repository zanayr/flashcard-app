import React from 'react';

import Logo from './Logo/Logo';
import Search from '../search/Search';
import Toolbar from './Toolbar/Toolbar';
import Dashboard from './Dashboard/Dashboard';

import GlobalCSS from '../../../Global.module.css';
import HeaderCSS from './Header.module.css';

const header = (props) => {
    const handle_onClick = (event) => {
        event.stopPropagation();

        props.onClick();
    }

    return (
        <header
            className={HeaderCSS.Header}
            onClick={(e) => handle_onClick(e)}>
            <div className={[GlobalCSS.Inner, GlobalCSS.With_Padding].join(' ')}>
                <Logo/>
                <Search/>
                <Toolbar
                    onA={props.onA}
                    onB={props.onB}/>
                <Dashboard
                    onNavigation={props.onNavigation}/>
            </div>
        </header>
    );
}

export default header;