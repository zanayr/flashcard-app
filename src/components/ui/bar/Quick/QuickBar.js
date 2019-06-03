import React from 'react';

import * as utility from '../../../../utility/utility';

import QuickButton from '../../button/Quick/QuickButton';

import styles from '../Bar.module.css';


const quickBar = (props) => {
    let quicks = null;
    let action = null;
    let icon = null;
    quicks = props.data.map((quick, i) => {
        switch (quick) {
            case 'f':
                icon = '∅';
                action = () => props.action(0);
                break;
            case 's':
                icon = '⨯';
                action = () => props.action(1);
                break;
            case 'u':
                icon = '⤺';
                action = () => props.action(2);
                break;
            default:
                break;
        }
        return (
            <QuickButton
                undo={quick === 'u'}
                key={utility.createHashId(i)}
                onClick={action}>
                {icon}
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