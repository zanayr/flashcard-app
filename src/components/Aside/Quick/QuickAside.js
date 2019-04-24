import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import Column from '../../../hoc/Column/Column';
import IconButton from '../../ui/button/Icon/IconButton';
import BarLink from '../../ui/Link/Bar/BarLink';
import QuickForm from '../../form/Quick/QuickForm';

const quickAside = (props) => {
    return (
        <Aux>
            <Column just='Between'>
                <section>
                <Row just='Between'>
                    <h3>Quick Inspect</h3>
                    <IconButton onClick={props.onClose}>X</IconButton>
                </Row>
                <QuickForm
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

export default quickAside;