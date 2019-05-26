import React from 'react';
import {withRouter} from 'react-router-dom';

import * as asideTypes from './asideTypes';

import Aux from '../../../hoc/Aux/Aux';
import AssignAside from '../Assign/AssignAside';
import FilterAside2 from '../Filter/FilterAside2';
import InspectAside2 from '../Inspect/InspectAside2';
import NavigationAiside2 from '../Nav/NavAside2';
import AsideOverlay from '../../Overlay/Aside/AsideOverlay';

const aside2 = (props) => {
    let aside = null;
    switch (props.state) {
        case asideTypes.CLOSED:
            aside = (null);
            break;
        // case asideTypes.ASSIGN_ITEM:
        //     aside = (
        //         <AssignAside
        //             actions={props.actions}
        //             data={props.data}/>
        //     );
        //     break;
        // case asideTypes.CREATE_CARD:
        // case asideTypes.INSPECT_CARD:
        //     aside = (
        //         <InspectAside
        //             actions={props.actions}
        //             data={{
        //                 ...props.data,
        //                 primary: 'Front',
        //                 secondary: 'Back',
        //             }}
        //             path={'create'}/>
        //     );
        //     break;
        // case asideTypes.CREATE_USER:
        // case asideTypes.INSPECT_USER:
        //     aside = (
        //         <InspectAside
        //             actions={props.actions}
        //             data={{
        //                 ...props.data,
        //                 primary: 'First',
        //                 secondary: 'Last',
        //             }}
        //             path={''}/>
        //     );
        //     break;
        // case asideTypes.CREATE_COLLECTION:
        // case asideTypes.INSPECT_COLLECTION:
        //     aside = (
        //         <InspectAside
        //             actions={props.actions}
        //             data={{
        //                 ...props.data,
        //                 primary: 'Title',
        //                 secondary: 'Details'
        //             }}
        //             path={props.page}/>
        //     );
        //     break;
        // case asideTypes.CREATE_ITEM:
        // case asideTypes.INSPECT_ITEM:
        //     aside = (
        //         <InspectAside
        //             actions={props.actions}
        //             data={{
        //                 ...props.data,
        //                 primary: props.page !== 'student' ? 'Front' : 'First',
        //                 secondary: props.page !== 'student' ? 'Back' : 'Last',
        //             }}
        //             path={props.page !== 'student' ? 'create' : ''}/>
        //     );
        //     break;
        // case asideTypes.FILTER_TAG:
        //     aside = (
        //         <FilterAside
        //             actions={props.actions}
        //             data={props.data}/>
        //     );
        //     break;
        // case asideTypes.FILTER_GROUP:
        //     aside = (
        //         <FilterAside
        //             actions={props.actions}
        //             data={props.data}/>
        //     );
        //     break;
        // case asideTypes.NAVIGATION:
        //     aside = (
        //         <NavigationAiside
        //             actions={props.actions}
        //             data={props.data}
        //             page={props.page}/>
        //     );
        //     break;
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
                        path={props.page}/>
                    <AsideOverlay
                        action={props.actions.confirm}
                        active={true}/>
                </Aux>
            );
            break;
        case asideTypes.NAVIGATION:
            aside = (
                <Aux>
                    <NavigationAiside2
                        actions={props.actions}
                        data={props.data}
                        history={props.history}
                        page={props.page}/>
                    <AsideOverlay
                        action={props.actions.cancel}
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
    console.log(props.actions.confirm);
    return aside;
}

export default withRouter(aside2);