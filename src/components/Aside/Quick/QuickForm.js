import React from 'react';

import Aux from '../../../hoc/aux/Aux';
import Row from '../../structure/row/Row';
import Column from '../../structure/column/Column';
import IconButton from '../../ui/button/icon/IconButton';
import BarLink from '../../ui/Link/Bar/BarLink';
import QuickInspectForm from '../../Form/Quick/QuickInspectForm';

const quickInspectAside = (props) => {
    return (
        <Aux>
            <Column just='Between'>
                <section>
                <Row just='Between'>
                    <h3>Quick Inspect</h3>
                    <IconButton onClick={props.onClose}>X</IconButton>
                </Row>
                <QuickInspectForm
                    actions={props.actions}
                    data={props.data}/>
                </section>
                <Row>
                    <BarLink path='u/inspect'>Open Inspector</BarLink>
                </Row>
            </Column>
        </Aux>
    );
}

export default quickInspectAside;