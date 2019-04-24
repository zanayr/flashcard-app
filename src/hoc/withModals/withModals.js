import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/modal/Modal/Modal';

const withModals = (WrappedComponent) => {
    const modals = [];

    const handle_onModalRequest = (payload) => {
        modals.push((
            <Modal
                actions={payload.actions}
                data={payload.data}/>
        ));
    }

    return (
        <Aux>
            <WrappedComponent requestModal={handle_onModalRequest} {...props}/>
            {modals}
        </Aux>
    );
}

export default withModals;