import React from 'react';

import * as asideTypes from './asideTypes';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';
import CardInspect from '../Inspect/CardInspect';

const aside = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.CLOSED:
            aside = (null);
            break;
        case asideTypes.CREATE_CARD:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Front',
                        secondary: 'Back'
                    }}
                    path={'/u/create'}
                    page={props.page}/>
            );
            break;
        case asideTypes.CREATE_DECK:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Title',
                        secondary: 'Details'
                    }}
                    path={'/u/deck'}
                    page={props.page}/>
            );
            break;
        case asideTypes.FILTER_TAG:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.FILTER_GROUP:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.INSPECT_CARD:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Front',
                        secondary: 'Back'
                    }}
                    path={'/u/create'}
                    page={props.page}/>
            );
            break;
        case asideTypes.INSPECT_DECK:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Title',
                        secondary: 'Details'
                    }}
                    path={'/u/deck'}
                    page={props.page}/>
            );
            break;
        case asideTypes.NAVIGATION:
            aside = (
                <NavigationAiside
                    actions={props.actions}
                    data={props.data}
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