import React, {Component} from 'react';

import NavigationAiside from '../Nav/NavAside';
import FilterAside from '../Filter/FilterAside';
import QuickInspectAside from '../Quick/QuickAside';

import TestAside from '../Test/TestAside';

import AppCSS from '../../../App.module.css';
import AsideCSS from './Aside.module.css';

const aside = (props) => {
    let asideContent;
    let cssClasses = [AsideCSS.Aside];
    if (props.active) {
        cssClasses = [...cssClasses, AsideCSS.Active];
    }
    console.log('aside rendering...', props);
    switch (props.state) {
        case 1:
            asideContent = (
                <NavigationAiside
                    actions={props.actions}
                    data={props.data}
                    onClose={props.onClose}/>
            );
            break;
        case 2:
            asideContent = (
                <FilterAside
                    actions={props.actions}
                    data={props.data}
                    onClose={props.onClose}/>
            );
            break;
        case 3:
            asideContent = (
                <TestAside
                    data={props.data}/>
            );
            break;
        case 99:
            asideContent = (
                <QuickInspectAside
                    actions={props.actions}
                    data={props.data}
                    onClose={props.onClose}/>
            );
            break;
        default:
            asideContent = (
                null
            );
            break;
    }

    return (
        
        <aside className={cssClasses.join(' ')}>
            <div className={AppCSS.Inner}>
                {asideContent}
            </div>
        </aside>
    );
}

export default aside;