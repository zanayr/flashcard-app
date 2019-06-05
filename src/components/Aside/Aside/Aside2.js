import React from 'react';
import {withRouter} from 'react-router-dom';

import * as asideTypes from './asideTypes';

import AsideOverlay from '../../Overlay/AsideOverlay';
import AssignAside from '../Assign/AssignAside';
import Aux from '../../../hoc/Aux/Aux';
import FilterAside from '../Filter/FilterAside';
import InspectAside from '../Inspect/InspectAside';
import NavigationAside from '../Navigation/NavigationAside';
import ReportAside from '../Report/ReportAside';


const aside = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.ASSIGN:
            //  !! Assign aside's overlay is inisde the aside object.
            aside = (
                <AssignAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.CLOSED:
            aside = (null);
            break;
        case asideTypes.FILTER:
            aside = (
                <FilterAside
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.INSPECT:
            aside = (
                <Aux>
                    <InspectAside
                        actions={props.actions}
                        data={props.data}
                        history={props.history}
                        path={props.page === 'deck' ? props.page : 'create'}/>
                    <AsideOverlay
                        action={props.actions.overlay}
                        active={true}/>
                </Aux>
            );
            break;
        case asideTypes.NAVIGATION:
            aside = (
                <Aux>
                    <NavigationAside
                        data={props.data}
                        history={props.history}
                        page={props.page}/>
                    <AsideOverlay
                        action={props.actions.overlay}
                        active={true}/>
                </Aux>
            );
            break;
        case asideTypes.REPORT:
            aside = (
                <Aux>
                    <ReportAside
                        actions={props.actions}
                        data={props.data}/>
                    <AsideOverlay
                        action={props.actions.overlay}
                        active={true}/>
                </Aux>
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

export default withRouter(aside);