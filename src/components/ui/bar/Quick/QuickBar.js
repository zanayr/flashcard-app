import React from 'react';

import * as utility from '../../../../utility/utility';

import QuickButton from '../../button/Quick/QuickButton';

import styles from '../Bar.module.css';


const quickBar = (props) => {
    let quicks = null;
    let action = null;
    quicks = props.data.map((quick, i) => {
        switch (quick) {
            case 'f':
                action = props.actions.onFilterClear
                break;
            case 's':
                action = props.actions.onSelectClear
                break;
            case 'u':
                action = props.actions.onUndo
                break;
            default:
                break;
        }
        return (
            <QuickButton
                key={utility.createHashId(i)}
                onClick={action}>
                {quick}
            </QuickButton>
        );
    });
    return (
        <section className={styles.QuickBar}>
            <div>
                {quicks}
            </div>
        </section>
    );
}


export default quickBar;