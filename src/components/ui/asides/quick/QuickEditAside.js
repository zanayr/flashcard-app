import React from 'react';

import Aux from '../../../../hoc/aux/Aux';
import Row from '../../../structure/row/Row';
import Column from '../../../structure/column/Column';
import IconButton from '../../button/icon/IconButton';
import QuickEditForm from '../../../forms/quick/QuickEdit';

const quickEditAside = (props) => {
    return (
        <Aux>
            <Row just='Between'>
                <h3>Quick Edit</h3>
                <IconButton onClick={props.onClose}>X</IconButton>
            </Row>
            <Column>
                <QuickEditForm
                    actions={props.actions}
                    data={props.data}/>
            </Column>
        </Aux>
    );
}

export default quickEditAside;