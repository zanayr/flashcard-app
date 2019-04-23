import React, {Component} from 'react';

import NavigationAiside from './navigation/NavigationAside';
import QuickEditAside from './quick/QuickEditAside';

import GlobalCSS from '../../../Global.module.css';
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
                <NavigationAiside onClose={props.onClose}/>
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
                <QuickEditAside
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
            <div className={GlobalCSS.Inner}>
                {asideContent}
            </div>
        </aside>
    );
}

export default aside;