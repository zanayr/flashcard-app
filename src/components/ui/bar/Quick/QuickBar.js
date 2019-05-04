import React from 'react';

import * as utility from '../../../../utility/utility';

import QuickButton from '../../button/Quick/QuickButton';

import styles from '../Bar.module.css';


//  &#8619;

//  &#10005;

const quickBar = (props) => {
    let quicks = null;
    if (props.data.length) {
        quicks = props.data.map((quick, i) => {
            return (
                <QuickButton
                    key={utility.createHashId(i)}
                    onClick={quick.action}>
                    {quick.value}
                </QuickButton>
            );
        });
    }
    return (
        <section className={styles.QuickBar}>
            <div>
                {quicks}
            </div>
        </section>
    );
}


export default quickBar;