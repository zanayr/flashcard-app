import React from 'react';

import * as asideTypes from './asideTypes';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';
import CardInspect from '../Inspect/CardInspect';

const aside = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.NAVIGATION:
            aside = (
                <NavigationAiside
                    actions={props.actions}
                    data={props.data}
                    page={props.page}/>
            );
            break;
        case asideTypes.FILTER_TAG:
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
        case asideTypes.FILTER_GROUP:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        category: 'group'
                    }}/>
            );
            break;
        case asideTypes.CREATE_CARD:
            aside = (
                <CardInspect
                    actions={props.actions}
                    data={props.data}
                    path={'/u/create'}
                    page={props.page}/>
            );
            break;
        case asideTypes.INSPECT_CARD:
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
        case asideTypes.CLOSED: {
            aside = (
                null
            );
            break;
        }
        default:
            aside = (
                null
            );
            break;
    }
    return aside;
}

export default aside;