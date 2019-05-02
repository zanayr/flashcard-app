import React from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import QuickInspectAside from '../Quick/QuickAside';

const aside = (props) => {
    let aside = null;
    if (props.active) {
        switch (props.state) {
            case 1:
                aside = (
                    <NavigationAiside
                        actions={props.actions}
                        data={props.data}
                        onClose={props.onClose}/>
                );
                break;
            case 2:
            case 3:
                aside = (
                    <FilterAside
                        actions={props.actions}
                        data={props.data}
                        onClose={props.onClose}/>
                );
                break;
            case 99:
                aside = (
                    <QuickInspectAside
                        actions={props.actions}
                        data={props.data}
                        onClose={props.onClose}/>
                );
                break;
            default:
                aside = (
                    null
                );
                break;
        }
    }
    return aside;
}

export default aside;