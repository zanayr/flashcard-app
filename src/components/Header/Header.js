import React from 'react';

import ReturnLink from '../ui/link/Return/ReturnLink';
import Search from '../ui/input/Search/Search';
import Toolbar from '../ui/Toolbar/Toolbar';
import Dashboard from '../ui/Dashboard/Dashboard';

import AppCSS from '../../App.module.css';
import HeaderCSS from './Header.module.css';

const header = (props) => {
    const handle_onClick = (event) => {
        event.stopPropagation();
        props.onClick();
    }

    const handle_onBulkDelete = () => {
        const selected = props.selected;
        selected.forEach(id => {
            props.actions.deleteItem(id);
        });
    }

    return (
        <header
            className={HeaderCSS.Header}
            onClick={(e) => handle_onClick(e)}>
            <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                <ReturnLink/>
                <Search/>
                <Toolbar
                    onA={props.onA}
                    onB={props.onB}
                    onC={handle_onBulkDelete}/>
                <Dashboard
                    onNavigation={props.onNavigation}/>
            </div>
        </header>
    );
}

export default header;