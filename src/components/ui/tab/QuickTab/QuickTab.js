import React, {Component} from 'react';

import styles from '../Tab.module.css';


class QuickTab extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.active !== this.props.active);
    }

    handle_onClick = (e) => {
        e.stopPropagation();
        this.props.onClick();
    }

    render () {
        let css = [styles.QuickTab];
        if (this.props.active) {
            css.push(styles.Active);
        }
        return (
            <div className={css.join(' ')}>
                <div>
                    <button onClick={(e) => this.handle_onClick(e)}>{this.props.children}</button>
                </div>
            </div>
        )
    }
}


export default QuickTab;