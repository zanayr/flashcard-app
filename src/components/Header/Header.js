import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as modalTypes from '../modal/Modal/modalTypes';
import * as sortTypes from '../../utility/sortTypes';

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

    const handle_onDelete = () => {
        props.displayModal_async(
            modalTypes.WARNING,
            'Once you delete an item, it cannot be recovered. Are you sure you wish to delete these items?',
            'Delete', 'Cancel')
        .then(response => {
            if (response) {
                props.actions.onDelete()
            }
        });
    };

    const handle_onMerge = () => {
        props.displayModal_async(
            modalTypes.DEFAULT,
            'Are you sure you wish to merge these decks into one deck?',
            'Merge', 'Cancel')
        .then(response => {
            if (response) {
                props.actions.onMerge();
            }
        });
    };

    const handle_onClone = () => {
        props.displayModal_async(
            modalTypes.DEFAULT,
            'Are you sure you wish to close these items?',
            'Clone', 'Cancel')
        .then(response => {
            if (response) {
                props.actions.onClone();
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
                    single={props.selected.length}
                    merge={props.selected.length > 1 && props.selected[0].type === 'deck'}
                    onA={() => props.actions.toggleAside(2)}
                    onB={() => props.actions.toggleAside(3)}
                    onC={handle_onDelete}
                    onD={handle_onMerge}
                    onE={handle_onClone}
                    onAA={() => props.actions.onSortChange(sortTypes.ALPHA_ASC)}
                    onAD={() => props.actions.onSortChange(sortTypes.ALPHA_DSC)}
                    onDA={() => props.actions.onSortChange(sortTypes.DATE_ASC)}
                    onDD={() => props.actions.onSortChange(sortTypes.DATE_DSC)}
                    />
                <Dashboard
                    onNavigation={() => props.actions.toggleAside(1)}/>
            </div>
        </header>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        displayModal_async: (type, message, confirm, cancel) => dispatch(actions.displayModal_async(type, message, confirm, cancel))
    };
};


export default connect(null, mapDispatchToProps)(header);