import React from 'react';

import styles from './Graph.module.css';


const metaGraph = (props) => {
    console.log(props.source);
    let data = Object.keys(props.source.data).map(id => {
        return props.source.data[id];
    });
    let count = 0;
    let total = 0;
    data.forEach(datum => {
        count++;
        total = datum.meta.time.average + total;
    });
    let average = total / count;
    let rows = data.map(datum => {
        console.log(datum);
        return (
            <div className={styles.GraphRow}>
                <div>
                    <div className={[styles.GraphCell, styles.Primary].join(' ')}>
                        <p>{datum.primary}</p>
                    </div>
                    <div className={styles.GraphCell}>
                        <p>{props.source.meta[datum.id].time}</p>
                    </div>
                    <div className={styles.GraphCell}>
                        <p>{datum.meta.time.average}</p>
                    </div>
                    <div className={styles.GraphCell}>
                        <p>{datum.meta.count}</p>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <section className={styles.Meta}>
            <div>
                <div className={styles.Row}>
                    <div>
                        <h3 className={styles.lable}>Average:</h3>
                        <p className={styles.Large}>{average}</p>
                    </div>
                </div>
                <div className={styles.Column}>
                    <div>
                        <div className={styles.Header}>
                            <div>
                                <div className={[styles.GraphCell, styles.Primary].join(' ')}>
                                    <p>Card</p>
                                </div>
                                <div className={styles.GraphCell}>
                                    <p>Time</p>
                                </div>
                                <div className={styles.GraphCell}>
                                    <p>Time Average</p>
                                </div>
                                <div className={styles.GraphCell}>
                                    <p>Seen</p>
                                </div>
                            </div>
                        </div>
                        {rows}
                    </div>
                </div>
            </div>
        </section>
    );
}


export default metaGraph;