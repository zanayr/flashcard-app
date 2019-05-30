import React from 'react';

import Cell from './Cell';

import styles from './Table.module.css';


const head = (props) => {
    const columns = props.columns.map((title, i) => {
        return (<Cell key={i} data={title}/>);
    });
    return (
        <div className={styles.TableHead}>
            <div>
                {columns}
            </div>
        </div>
    );
}


export default head;