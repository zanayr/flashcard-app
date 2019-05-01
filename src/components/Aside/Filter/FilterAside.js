import React from 'react';
//import * as utility from '../../../utility';

import Aux from '../../../hoc/Aux/Aux';
import Row from '../../../hoc/Row/Row';
import IconButton from '../../ui/button/Icon/IconButton';
import BarButton from '../../ui/button/Bar/BarButton';

import styles from './FilterAside.module.css';

const filterAside = (props) => {
    const filterButtons = props.data.filters.map((filter, i) => {
        return (
            <BarButton
                key={i}
                onClick={() => props.actions.onToggle(props.data.category, filter)}>
                {filter}
            </BarButton>
        );
    });
    
    return (
        <Aux>
            <Row just='Between'>
                <h3>Filter</h3>
                <IconButton onClick={() => props.onClose()}>X</IconButton>
            </Row>
            <div className={styles.FilterAside}>
                <div>
                    {filterButtons}
                </div>
            </div>
        </Aux>
    );
}

export default filterAside;