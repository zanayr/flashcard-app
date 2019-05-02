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
    let tabs = utility.sortAscByProp(props.backingCollection, 'order').map((orderedTab, i) => {
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
                onClose={() => props.actions.close(tab)}>
                {tab.name}
            </QuickTab>
        );
    })

    return (
        <section
            className={styles.TabBar}
            onClick={(e) => handle_onBarClick(e)}>
            <div>
                {tabs}
                <div className={styles.QuickTab}>
                    <div>
                        <button onClick={(e) => handle_onAddClick(e)}>+</button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default tabBar;