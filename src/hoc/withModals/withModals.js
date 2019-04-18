
import React from 'react';

import Modal from '../../components/ui/modal/Modal';
import Aux from '../aux/Aux';

const withModals = (WrappedComponent) => {
    /*
    const modalStack = Object.keys(props.modals).map(k => {
        return <Modal
            key={k}
            message={modals[k].message}
            modalId={k}/>
    });
    */
   console.log(props);
    return (props) => {
        return (
            <Aux>
                {/*{modalStack}*/}
                <WrappedComponent {...props} />
            </Aux>
        );
    }
    
}

export default withModals;