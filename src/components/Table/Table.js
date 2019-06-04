import React from 'react';

import Head from '../ui/Table/Head';
import Row from '../ui/Table/Row';

import styles from './Table.module.css';

const table = (props) => {
        const rows = props.source.map((entry, i) => {
            return (<Row key={i} data={entry}/>);
        });
        return (
            <section className={styles.Table}>
                <div>
                    <Head columns={props.columns}/>
                    {rows}
                </div>
            </section>
        );
}


export default table;