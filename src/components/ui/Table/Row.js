import React from 'react';

import Cell from './Cell';

import styles from './Table.module.css';


const row = (props) => {
    const cells = Object.keys(props.data).map((key, i) => {
        return (<Cell key={i} data={props.data[key]}/>);
    });
    return (
        <div className={styles.TableRow}>
            <div>
                {cells}
            </div>
        </div>
    );
}


export default row;