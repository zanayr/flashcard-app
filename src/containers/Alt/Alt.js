import React from 'react';

import {Link} from 'react-router-dom';


const alt = (props) => {
    return (
        <main>
            <div>
                <section>
                    <div>
                        <h1>There was an issue loggin you in!</h1>
                        <p>{props.location.state.message} Sorry for the inconvenience.</p>
                        <p>Click here to return to the <Link to='/out'>sign in</Link> page.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}


export default alt;