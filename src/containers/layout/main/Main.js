import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../../../style.css';
import MainCSS from './Main.module.css';

class Main extends Component {
    render() {
        return (
            <main className={MainCSS.Default}>
                <Link to="/logout">Logout</Link>
            </main>
        )
    }
}

export default Main;