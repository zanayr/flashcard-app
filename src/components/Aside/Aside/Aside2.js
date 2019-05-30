import React from 'react';
import {withRouter} from 'react-router-dom';

import * as asideTypes from './asideTypes';

import AsideOverlay from '../../Overlay/Aside/AsideOverlay';
import AssignAside from '../Assign/AssignAside';
import Aux from '../../../hoc/Aux/Aux';
import FilterAside2 from '../Filter/FilterAside2';
import InspectAside2 from '../Inspect/InspectAside2';
import NavigationAside2 from '../Nav/NavAside2';
import ReportAside from '../Report/ReportAside';


const aside2 = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.ASSIGN:
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
                <FilterAside2
                    actions={props.actions}
                    data={props.data}/>
            );
            break;
        case asideTypes.INSPECT:
            aside = (
                <Aux>
                    <InspectAside2
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
                    <NavigationAside2
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

export default withRouter(aside2);