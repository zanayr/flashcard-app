import React, {Component} from 'react';

import styles from '../Input.module.css';


class StatefulTextField extends Component {
    state = {
        value: this.props.value
    }


    setValue (value) {
        this.setState({value: value});
    }
    handle_onChange = (value) => {
        this.setValue(value);
    }


    render() {
        const remaining = this.props.config.maxLength - this.state.value.length;
        let counterCSS = [styles.Counter];
        if (remaining < 4) {
            counterCSS.push(styles.Low);
        }
        return (
            <div className={styles.Field}>
                <div>
                    <label>{this.props.config.label}</label>
                    <input
                        className={styles.Input}
                        {...this.props.config}
                        placeholder={this.props.config.placeholder || this.props.config.label}
                        required={this.props.required ? true : false}
                        type='text'
                        tabIndex={this.props.config.tabIndex || -1}
                        value={this.state.value}
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    {this.props.children}
                    <span className={counterCSS.join(' ')}><p>{remaining}</p></span>
                </div>
            </div>
        );
    }
}


export default StatefulTextField;