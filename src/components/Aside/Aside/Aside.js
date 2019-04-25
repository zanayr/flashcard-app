import React, {Component} from 'react';

import NavigationAiside from '../Nav/NavAside';
import QuickInspectAside from '../Quick/QuickAside';

import AppCSS from '../../../App.module.css';
import AsideCSS from './Aside.module.css';

const aside = (props) => {
    let asideContent;
    let cssClasses = [AsideCSS.Aside];
    if (props.active) {
        cssClasses = [...cssClasses, AsideCSS.Active];
    }
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
                <h3>Aside #{props.state}</h3>
            );
            break;
        case 3:
            asideContent = (
                <h3>Aside #{props.state}</h3>
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