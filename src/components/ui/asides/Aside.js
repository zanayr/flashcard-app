import React, {Component} from 'react';

import globalCSS from '../../../Global.module.css';
import asideCSS from './Aside.module.css';

class Aside extends Component {
    render() {
        return (
            <aside className={[asideCSS.Aside, this.props.active ? asideCSS.Active : ''].join(' ')}>
                <div className={globalCSS.Inner}>
                    <h3>Aside #{this.props.current}</h3>
                </div>
            </aside>
        );
    }
}

export default Aside;