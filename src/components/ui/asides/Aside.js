import React, {Component} from 'react';

import asideCSS from './Aside.module.css';

class Aside extends Component {
    render() {
        return (
            <aside className={this.props.active ? asideCSS.Active : ""}>
                <div>
                    <h3>Aside #{this.props.current}</h3>
                </div>
            </aside>
        );
    }
}

export default Aside;