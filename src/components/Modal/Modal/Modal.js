import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as modalTypes from './modalTypes';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../ui/button/Button/Button';
import Overlay from '../Overlay/Overlay';
import Row from '../../../hoc/Row/Row';

import AppCSS from '../../../App.module.css';
import ModalCSS from './Modal.module.css';


const modal = (props) => {
    let icon;
    let title;
    switch (props.type) {
        case modalTypes.WARNING:
            icon = (<span className={ModalCSS.WarningIcon}></span>);
            title= ('Warning!');
            break;
        default:
            icon = (<span className={ModalCSS.DefaultIcon}></span>);
            title= (props.data.type);
            break;
    }

    const handle_onCancel = () => {
        props.data.onResponse(false);
        props.clearModal({key: props.uniqueId});
    }
    const handle_onConfirm = () => {
        props.data.onResponse(true);
        props.clearModal({key: props.uniqueId});
    }

    return (
        
        <Aux>
            <Overlay active={true}/>
            <div className={ModalCSS.Modal}
                key={props.uniqueId}>
                <div className={AppCSS.Inner}>
                    <Row just='Start' align='Center'>
                        {icon}
                        <h3>{title}</h3>
                    </Row>
                    <p>{props.data.message}</p>
                    <Row just={props.data.cancel ? 'Between' : 'Center'}>
                        {props.data.cancel ? <Button onClick={handle_onCancel}>{props.data.cancel}</Button> : null}
                        <Button onClick={handle_onConfirm}>{props.data.confirm}</Button>
                    </Row>
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