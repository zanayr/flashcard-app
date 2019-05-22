import React from 'react';

import * as asideTypes from './asideTypes';

import AssignAside from '../Assign/AssignAside';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';
import NavigationAiside from '../Nav/NavAside';

const aside = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.CLOSED:
            aside = (null);
            break;
        case asideTypes.ASSIGN_ITEM:
            aside = (
                <AssignAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.CREATE_CARD:
        case asideTypes.INSPECT_CARD:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Front',
                        secondary: 'Back',
                    }}
                    path={'/create'}/>
            );
            break;
        case asideTypes.CREATE_USER:
        case asideTypes.INSPECT_USER:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'First',
                        secondary: 'Last',
                    }}
                    path={''}/>
            );
            break;
        case asideTypes.CREATE_COLLECTION:
        case asideTypes.INSPECT_COLLECTION:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: 'Title',
                        secondary: 'Details'
                    }}
                    path={'/0/' + props.page}/>
            );
            break;
        case asideTypes.CREATE_ITEM:
        case asideTypes.INSPECT_ITEM:
            aside = (
                <InspectAside
                    actions={props.actions}
                    data={{
                        ...props.data,
                        primary: props.page === 'deck' ? 'Front' : 'First',
                        secondary: props.page === 'deck' ? 'Back' : 'Last',
                    }}
                    path={props.page === 'deck' ? '/create' : ''}/>
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