import React, {Component} from 'react';

class ListRow extends Component {
    componentDidUpdate (p, s) {
        console.log('list row updated')
    }

    render () {
        return (
            <section className={this.props.className.join(' ')}>
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}

export default ListRow;