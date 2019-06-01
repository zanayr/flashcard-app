import React, {Component} from 'react';

import styles from './Tab.module.css';


class QuickTab2 extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.active !== this.props.active);
    }

    handle_onTabClick = (e) => {
        e.stopPropagation();
        this.props.onClick();
    }
    handle_onTabClose = (e) => {
        e.stopPropagation();
        this.props.onClose();
    }

    render () {
        let css = [styles.Quick];
        let close = null;
        if (this.props.active) {
            css.push(styles.Active);
        }
        if (this.props.delete) {
            css.push(styles.WithRemove);
            close = (
                <button
                    className={styles.Remove}
                    onClick={(e) => this.handle_onTabClose(e)}>
                    x
                </button>
            );
        }
        return (
            <div
                className={css.join(' ')}
                onClick={(e) => this.handle_onTabClick(e)}>
                <div>
                    <p><span>{this.props.children}</span></p>
                    {close}
                </div>
            </div>
        )
    }
}


export default QuickTab2;