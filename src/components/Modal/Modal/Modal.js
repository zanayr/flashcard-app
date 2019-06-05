import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as modalTypes from './modalTypes';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../ui/button/Button/Button';
import ModalOverlay from '../../Overlay/ModalOverlay';

import AppCSS from '../../../App.module.css';
import styles from './Modal.module.css';
import StatefulTextField from '../../ui/input/Field/StatefulTextField';


const modal = (props) => {
    let icon;
    let title;
    let form = null;
    const responseForm = React.createRef();


    const handle_onCancel = () => {
        props.data.onCancel(false);
        props.clearModal({key: props.uniqueId});
    }
    const handle_onConfirm = () => {
        if (responseForm.current) {
            props.data.onConfirm(responseForm.current.response.value);
        } else {
            props.data.onConfirm(true);
        }
        props.clearModal({key: props.uniqueId});
    }


    switch (props.type) {
        case modalTypes.DEFAULT:
            icon = (<span className={styles.DefaultIcon}></span>);
            title= ('Hello');
            break;
        case modalTypes.RESPONSE:
            icon = (<span className={styles.DefaultIcon}></span>);
            title= ('Hello');
            break;
        case modalTypes.WARNING:
            icon = (<span className={styles.WarningIcon}></span>);
            title= ('Warning!');
            break;
        default:
            icon = (<span className={styles.DefaultIcon}></span>);
            title= (props.data.type);
            break;
    }
    if (props.type === modalTypes.RESPONSE) {
        form = (
            <form
                ref={responseForm}>
                <StatefulTextField
                    config={{
                        autoComplete: 'off',
                        label: 'Response',
                        maxLength: 32,
                        name: 'response',
                        placeholder: 'Merged Name',
                        tabIndex: 1,
                    }}
                    key='response'
                    value={''}/>
            </form>
        );
    }
    
    return (
        <Aux>
            <div className={styles.Modal}
                key={props.uniqueId}>
                <div className={AppCSS.Inner}>
                    <div className={styles.Header}>
                        <div>
                            {icon}
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <p className={styles.Message}>{props.data.message}</p>
                    {form}
                    <div className={styles.Interface}>
                        <div className={props.data.cancel ? styles.Between : styles.Center}>
                        {props.data.cancel ? <Button onClick={handle_onCancel}>{props.data.cancel}</Button> : null}
                        <Button onClick={handle_onConfirm}>{props.data.confirm}</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalOverlay active={true}/>
        </Aux>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        clearModal: (data) => dispatch(actions.clearModal(data))
    }
}


export default connect(null, mapDispatchToProps)(modal);