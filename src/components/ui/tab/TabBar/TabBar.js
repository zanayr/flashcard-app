import React from 'react';

import * as utility from '../../../../utility/utility';
import * as sortTypes from '../../../../utility/sortTypes';

import QuickTab from '../QuickTab/QuickTab';

import styles from '../Tab.module.css';


const tabBar = (props) => {
    const handle_onBarClick = (e) => {
        e.stopPropagation();
        props.actions.onClick();
    }
    const handle_onCreateClick = (e) => {
        e.stopPropagation();
        props.actions.onCreate();
    }
    let tabs = utility.sortBy(sortTypes.DATE_ASC, props.backingCollection).map(tab => {
        return (
            <QuickTab
                active={tab.id === props.current}
                delete={tab.delete}
                key={tab.id}
                onClick={() => props.actions.onToggle(tab.id)}
                onClose={() => props.actions.onRemove(tab.id)}>
                {tab.name}
            </QuickTab>
        );
    });
    let add = null;
    if (Object.keys(props.backingCollection).length < 12) {
        add = (
            <div className={styles.QuickTab}>
                <div>
                    <button onClick={(e) => handle_onCreateClick(e)}>+</button>
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