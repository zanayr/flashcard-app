import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as select from '../../../store/reducers/root';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../ui/button/Button/Button';
import Row from '../../../hoc/Row/Row';

import ModalCSS from '../Modal/Modal.module.css';


const deleteSingleModal = (props) => {
    //  EVENT HANDLERS  //
    const handle_onClear = () => {
        props.data.success(true);
        props.onClear();
    }
    const handle_onCancel = () => {
        props.data.failure(false);
        props.onClear();
    }

    let icon;
    switch (props.data.type) {
        default:
            icon = (<span className={ModalCSS.Default_Icon}></span>);
    }

    return (
        <Aux>
            <Row just='Start' align='Center'>
                {icon}
                <h3>Warning!</h3>
            </Row>
            <p>{props.data.message}</p>
            <Row just='Center'>
                <Button onClick={handle_onClear}>Ok</Button>
                <Button onClick={handle_onCancel}>Cancel</Button>
            </Row>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        clearModal: (data) => dispatch(actions.clearModal(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(deleteSingleModal);