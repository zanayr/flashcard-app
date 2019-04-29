import React, {Component} from 'react';

import listStyles from './List.module.css';

class List extends Component {
    render () {
        return (
            <section className={listStyles.List}>
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}


export default List;