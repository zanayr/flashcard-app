import React from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';

const aside = (props) => {
    let aside = null;
    switch (props.state) {
        case 1:
            aside = (
                <NavigationAiside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case 2:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        category: 'tags'
                    }}
                    filters={props.filters}/>
            );
            break;
        case 3:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        category: 'groups'
                    }}/>
            );
            break;
        case 99:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        default:
            aside = (
                null
            );
            break;
    }
    return aside;
}

export default aside;