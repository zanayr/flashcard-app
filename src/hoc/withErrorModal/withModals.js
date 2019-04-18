
import React from 'react';

import Modal from '../../components/ui/modal/Modal';
import Aux from '../aux/Aux';

const withModals = (WrappedComponent) => {
    function showModals() {
        Object.keys(props.modals).map(k => {
            <Modal
                key={k}
                modalId={props.modals[k].id}>
                {props.modals[k].message}
            </Modal>
        })
    }
    return (props) => {
        return (
            <Aux>
                {showModals()}
                <WrappedComponent {...props} />
            </Aux>
        );
    }
    
}

export default withModals;