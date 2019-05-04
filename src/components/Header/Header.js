import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as modalTypes from '../modal/Modal/modalTypes';

import ReturnLink from '../ui/link/Return/ReturnLink';
import Search from '../ui/input/Search/Search';
import Toolbar from '../ui/Toolbar/Toolbar';
import Dashboard from '../ui/Dashboard/Dashboard';

import AppCSS from '../../App.module.css';
import HeaderCSS from './Header.module.css';

const header = (props) => {
    const handle_onClick = (event) => {
        event.stopPropagation();
        props.actions.closeAside();
    }

    // const reply = (value) => {
    //     console.log(value);
    // }

    const handle_onBulkDelete = () => {
        // props.displayModal(modalTypes.DELETE, {
        //     action: props.actions.onDelete,
        //     data: props.selected.slice()
        // });
        props.displayModal_async(
            modalTypes.WARNING,
            'Once you delete an item, it cannot be recovered. Are you sure you wish to delete these items?',
            'Delete', 'Cancel')
        .then(response => {
            console.log(response);
            if (response) {
                console.log('Deleteing items...');
            } else {
                console.log('Nevermind...');
            }
        });
    };

    return (
        <header
            className={HeaderCSS.Header}
            onClick={(e) => handle_onClick(e)}>
            <div className={[AppCSS.Inner, AppCSS.With_Padding].join(' ')}>
                <ReturnLink/>
                <Search/>
                <Toolbar
                    onA={() => props.actions.toggleAside(2)}
                    onB={() => props.actions.toggleAside(3)}
                    onC={handle_onBulkDelete}/>
                <Dashboard
                    onNavigation={() => props.actions.toggleAside(1)}/>
            </div>
        </header>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        displayModal: (type, data) => dispatch(actions.displayModal(type, data)),
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel))
    };
};


export default connect(null, mapDispatchToProps)(header);