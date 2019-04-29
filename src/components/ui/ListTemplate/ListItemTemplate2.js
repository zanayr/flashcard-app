import React from 'react';

import Column from '../../../hoc/Column/Column';

import TemplateCSS from './ListItemTemplate.module.css';

const listItemTemplate2 = (props) => {
    return (
        <article
            className={TemplateCSS.List_Item_Template}
            onClick={props.onSelect}>
            <div>
                <Column just='Center' align='Start'>
                    <h3>{props.display}</h3>
                    <p>{props.detail}</p>
                </Column>
            </div>
        </article>
    );
}


export default listItemTemplate2;