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

    const handle_onBulkDelete = () => {
        const titles = [];
        const collection = Object.keys(props.collection).map(key => {
            return props.collection[key];
        })
        props.selected.forEach(id => {
            titles.push(collection.find(i => i.id == id).title);
        });
        props.displayModal(modalTypes.DELETE, titles);
    };
    



    // const handle_onFilterBy = (filter) => {
    //     props.actions.openFilter(filter);
    // }

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

    };
};


export default connect(null, mapDispatchToProps)(header);