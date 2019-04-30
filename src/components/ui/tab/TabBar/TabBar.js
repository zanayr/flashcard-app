import React from 'react';

import * as utility from '../../../../utility';

import QuickTab from '../QuickTab/QuickTab';

import styles from '../Tab.module.css';


const tabBar = (props) => {
    const handle_onBarClick = (e) => {
        e.stopPropagation();
        this.props.actions.click();
    }
    let tabs = Object.keys(props.backingCollection).map((tab, i) => {
        if (tab === 'actions') {
            return null
        } else {
            return (
                <QuickTab
                    active={props.backingCollection[tab].isActive}
                    delete={props.backingCollection[tab].canDelete}
                    key={tab}
                    onClick={() => props.actions.toggle(tab)}
                    onRemove={() => props.actions.remove(tab)}>
                    {tab}
                </QuickTab>
            )
        }
    })

    return (
        <section
            className={styles.TabBar}
            onClick={(e) => handle_onBarClick(e)}>
            <div>
                {tabs}
                <div className={styles.AddButton}>
                    <div>
                        <button onClick={props.actions.add}>+</button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default tabBar;