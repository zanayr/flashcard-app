import React from 'react';

import Cell from './Cell';

import styles from './Table.module.css';


const row = (props) => {
    const cells = props.data.map((cell, i) => {
        return (<Cell key={i} data={cell}/>);
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