import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as modalTypes from './modalTypes';

import Aux from '../../../hoc/Aux/Aux';
import DeleteModal from '../Delete/DeleteModal';
import Dialog from '../Dialog/Dialog';
import Overlay from '../Overlay/Overlay';

import AppCSS from '../../../App.module.css';
import ModalCSS from './Modal.module.css';


const modal = (props) => {
    const handle_onClear = () => {
        props.clearModal({key: props.uniqueId});
    }
    // const handle_onConfirm = () => {
    //     if (props.actions.callback) {
    //         props.actions.callback();
    //     }
    //     props.actions.onConfirm({key: props.data.key});
    //     props.clearModal({key: props.uniqueId});
    // }
    let modal;
    switch (props.type) {
        case modalTypes.DELETE:
            modal = (
                <DeleteModal
                    data={props.data}
                    onClear={handle_onClear}/>
            );
            break;
        default:
            modal = (
                <Dialog 
                    data={'Something went wrong...'}
                    type={'default'}
                    onClear={handle_onClear}/>
            )
            break;
    }

    return (
        
        <Aux>
            <Overlay active={true}/>
            <div className={ModalCSS.Modal}
                key={props.uniqueId}>
                <div className={AppCSS.Inner}>
                    {modal}
                </div>
            </div>
        </Aux>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        clearModal: (data) => dispatch(actions.clearModal(data))
    }
}


export default connect(null, mapDispatchToProps)(modal);