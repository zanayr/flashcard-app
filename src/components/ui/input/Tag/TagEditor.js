import React, {Component} from 'react';

import styles from '../Input.module.css';


class TagEditor extends Component {
    state = {
        value: this.props.value
    }

    _setValue (value) {
        this.setState({value: value});
    }

    handle_onChange = (value) => {
        this._setValue(value);
    }

    render () {
        const remaining = 128 - this.state.value.length;
        let counterCSS = [styles.Counter];
        if (remaining < 4) {
            counterCSS.push(styles.Low);
        }
        return (
            <div className={styles.Field}>
                <div>
                    <label>{this.props.label}</label>
                    <textarea
                        autoComplete={'off'}
                        className={this.props.className}
                        maxLength={128}
                        minLength={3}
                        name='tag'
                        pattern={'[a-zA-Z0-9 -,]+'}
                        placeholder={this.props.label}
                        tabIndex={this.props.tabIndex || -1}
                        value={this.state.value}
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    <span className={counterCSS.join(' ')}><p>{remaining}</p></span>
                </div>
            </div>
        );
    }
}


export default TagEditor;