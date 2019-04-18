import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../button/Button';
import * as actions from '../../../store/actions/index';

import ModalCSS from './Modal.module.css';

class Modal extends Component {
    render() {
        console.log(this.props.modalId);
        return (
            <div className={ModalCSS.Modal}>
                <p>{this.props.message}</p>
                <Button onClick={() => {this.props.onConfirm(this.props.modalId)}}>OK</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onConfirm: (id) => dispatch(actions.modalConfirm(id))
    }
}

export default connect(null, mapDispatchToProps)(Modal);