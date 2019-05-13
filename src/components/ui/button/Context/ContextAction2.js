import React, {Component} from 'react';

import styles from './Context.module.css';

class ContextAction2 extends Component {
    state = {
        selected: false
    }

    _setSelect (value) {
        this.setState({selected: value});
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.active !== this.props.active) {
            this._setSelect(false);
        }
    }
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.active !== this.props.active || nextState.selected !== this.state.selected;
    }
    
    handle_onClick (e) {
        e.stopPropagation();
        if (this.props.destructive) {
            if (this.state.selected) {
                this.props.action();
            } else {
                this._setSelect(true)
            }
        } else {
            this.props.action();
        }
    }

    render () {
        let content = null;
        let css = [styles.ContextAction2];
        if (this.props.destructive) {
            css.push(styles.Destructive2);
        }
        
        if (this.props.active) {
            css.push(styles.Active2);
            content = (
                <div
                    className={css.join(' ')}
                    style={{right: 64 * this.props.position}}>
                    <div>
                        <button onClick={(e) => {this.handle_onClick(e)}}>
                            {this.state.selected ? 'Confirm' : this.props.children}
                        </button>
                    </div>
                </div>
            )
        }

        return content;
    }
}

export default ContextAction2;