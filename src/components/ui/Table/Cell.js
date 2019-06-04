import React from 'react';

import styles from './Table.module.css';


const cell = (props) => {
    return (
        <div
            className={styles.TableCell}
            style={{width: props.width + '%'}}>
            <div>
                <p>{props.data}</p>
            </div>
        </div>
    );
}


export default cell;