import React from 'react';

import {Link} from 'react-router-dom';

import styles from '../Container.module.css';


const alt = (props) => {
    return (
        <main className={styles.Alt}>
            <div>
                <section>
                    <div>
                        <h1>There was an issue loggin you in!</h1>
                        <p>{props.location.state.message} We appologize for the inconvenience.</p>
                        <p>Return to the <Link to='/out'>sign in</Link> page.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}


export default alt;