import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as select from '../../../store/reducers/root';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../ui/button/Button/Button';
import Row from '../../../hoc/Row/Row';

import ModalCSS from '../Modal/Modal.module.css';


const deleteSingleModal = (props) => {
    console.log(props);
    let titles = props.data.map(title => {
        return (
            <li>{title}</li>
        );
    });


    const handle_onCancel = () => {
        props.onClear();
    }
    const handle_onConfirm = () => {
        //props.deleteManyItems_async(props.select_token, props.data);
        props.onClear();
    }

    return (
        <Aux>
            <Row just='Start' align='Center'>
                <span className={ModalCSS.Delete_Icon}></span>
                <h3>Warning!</h3>
            </Row>
            <p>Once an item has been deleted, it cannot be recovered. Are you sure you wish to delete these items?</p>
            <ul>{titles}</ul>
            <Row just='Between'>
                <Button onClick={handle_onCancel}>Cancel</Button>
                <Button onClick={handle_onConfirm}>Delete</Button>
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
        deleteItem_async: (token, key) => dispatch(actions.deleteItem_async(token, key))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(deleteSingleModal);