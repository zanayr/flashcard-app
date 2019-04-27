import React from 'react';

import Column from '../../../hoc/Column/Column';


const listTemplate = (props) => {
    return (
        <Column just='Center' align='Start'>
            <h3>{props.title}</h3>
            <p>{props.details}</p>
        </Column>
    );
}


export default listTemplate;