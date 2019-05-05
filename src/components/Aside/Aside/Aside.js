import React from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import QuickInspectAside from '../Quick/QuickAside';

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
                    onSelect={props.actions.filter}
                    data={{
                        ...props.data,
                        category: 'tags',
                        tags: props.tags
                    }}/>
            );
            break;
        case 3:
            aside = (
                <FilterAside
                    onSelect={props.actions.filter}
                    data={{
                        ...props.data,
                        category: 'groups',
                        tags: props.groups
                    }}/>
            );
            break;
        case 99:
            aside = (
                <QuickInspectAside
                    onChange={props.actions.change}
                    data={{
                        ...props.data,
                        groups: props.groups,
                        tags: props.tags
                    }}/>
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