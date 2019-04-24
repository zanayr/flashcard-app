import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import {createHashId} from '../../../utility';

import Aux from '../../../hoc/Aux/Aux';
import Overlay from '../Overlay/Overlay';
import Row from '../../../hoc/Row/Row';
import Button from '../../ui/button/Button/Button';

import AppCSS from '../../../App.module.css';
import modalCSS from './Modal.module.css';

const modal = (props) => {
    let details = [];
    /*
    if (!props.data.isActive) {
        return null;
    }*/
    if (props.data.details) {
        details = props.data.details.map(detail => {
            return (<li key={createHashId()}>{detail}</li>);
        });
    }

    const handle_onCancel = () => {
        props.actions.onCancel();
        props.clearModal_async(props);
    }
    const handle_onConfirm = () => {
        props.actions.onConfirm();
        props.clearModal_async(props);
    }

    return (
        <Aux>
            <Overlay active={true}/>
            <div className={modalCSS.Modal}
                key={createHashId()}>
                <div className={AppCSS.Inner}>
                    <Row just='Start' align='Center'>
                        <span></span>
                        <h3>{props.data.title ? props.data.title : 'Alert!'}</h3>
                    </Row>
                    <p>{props.data.message}</p>
                    {details.length ? (<ul>{details}</ul>) : null}
                    <Row just={props.data.cancel ? 'Between' : 'End'}>
                        {props.data.cancel ? (<Button onClick={handle_onCancel}>{props.data.cancel}</Button>) : null}
                        <Button onClick={handle_onConfirm}>{props.data.confirm ? props.data.confirm : 'OK'}</Button>
                    </Row>
                </div>
            </div>
        </Aux>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        clearModal_async: (payload) => dispatch(actions.modalClear(payload))
    }
}

export default connect(null, mapDispatchToProps)(modal);