import React from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';
import CardInspect from '../Inspect/CardInspect';

const aside = (props) => {
    let aside = null;
    console.log(props.state);
    switch (props.state) {
        case 1:
            aside = (
                <NavigationAiside
                    actions={props.actions}
                    data={props.data}
                    page={props.page}/>
            );
            break;
        case 2:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        category: 'tag'
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
                        category: 'group'
                    }}/>
            );
            break;
        case 97:
            aside = (
                <CardInspect
                    actions={props.actions}
                    data={props.data}
                    path={'/u/create'}
                    page={props.page}/>
            );
            break;
        case 98:
        case 99:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={props.data}
                    path={'/u/deck/'}
                    page={props.page}/>
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