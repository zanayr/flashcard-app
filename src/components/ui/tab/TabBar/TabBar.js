import React from 'react';

import * as utility from '../../../../utility';

import QuickTab from '../QuickTab/QuickTab';

import styles from '../Tab.module.css';


const tabBar = (props) => {
    const handle_onBarClick = (e) => {
        e.stopPropagation();
        props.actions.click();
    }
    const handle_onAddClick = (e) => {
        e.stopPropagation();
        props.actions.add();
    }
    let tabs = utility.sortAscByProp(props.backingCollection, 'date').map((orderedTab, i) => {
        let name = orderedTab[0];
        let tab = props.backingCollection[name];
        let isActive = false;
        if (name === props.current) {
            isActive = true;
        }

        return (
            <QuickTab
                active={isActive}
                delete={tab.canDelete}
                key={i}
                onClick={() => props.actions.toggle(name)}
                onClose={() => props.actions.close(name)}>
                {tab.name}
            </QuickTab>
        );
    });

    let add = null;
    if (Object.keys(props.backingCollection).length < 12) {
        add = (
            <div className={styles.QuickTab}>
                <div>
                    <button onClick={(e) => handle_onAddClick(e)}>+</button>
                </div>
            </div>
        );
    }

    return (
        <section
            className={styles.TabBar}
            onClick={(e) => handle_onBarClick(e)}>
            <div>
                {tabs}
                {add}
            </div>
        </section>
    )
}


export default tabBar;