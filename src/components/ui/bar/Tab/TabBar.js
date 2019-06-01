import React from 'react';

import * as sortTypes from '../../../../utility/sortTypes';
import * as utility from '../../../../utility/utility';

import QuickTab2 from '../../tab/QuickTab2';

import styles from '../Bar.module.css';


const tabBar = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }
    const handle_onSelect = (tab) => {
        props.action(1, tab);
    }
    const handle_onDelete = (tab) => {
        props.action(2, tab);
    }
    const handle_onAdd = (e) => {
        e.stopPropagation();
        props.action(0, null);
    }

    let tabs = null;
    let all = null;
    tabs = utility.sortBy(sortTypes.DATE_DSC, props.collection).map(tab => {
        return (
            <QuickTab2
                active={props.active === tab.id}
                delete
                key={tab.id}
                onClick={() => handle_onSelect(tab)}
                onClose={() => handle_onDelete(tab)}>
                {tab.name}
            </QuickTab2>
        );
    });
    if (tabs.length) {
        all = (
            <QuickTab2
                active={props.active === 'all'}
                key={'all'}
                onClick={() => handle_onSelect({
                    group: [],
                    id: 'all',
                    tag: []
                })}>
                All
            </QuickTab2>
        );
    }

    return (
        <section
            className={styles.TabBar}
            onClick={(e) => handle_onClick(e)}>
            <div>
                {all}
                {tabs}
                <div className={styles.Add}>
                    <div>
                        <button
                            disabled={Object.keys(props.collection).length >= 12}
                            onClick={(e) => handle_onAdd(e)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default tabBar;