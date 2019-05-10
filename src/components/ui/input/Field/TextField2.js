import React, {Component} from 'react';

import styles from '../Input/Input.module.css';


class TextField2 extends Component {
    state = {
        value: this.props.value || ''
    }

    handle_onChange = (value) => {
        this.setState({value: value})
    }

    render () {
        return (
            <div className={styles.Field}>
                <div>
                    <label>{this.props.config.label}</label>
                    <input
                        className={styles.Input}
                        {...this.props.config}
                        name={this.props.config.name || this.props.target}
                        placeholder={this.props.config.placeholder || this.props.config.label}
                        required={this.props.required ? true : false}
                        type='text'
                        tabIndex={this.props.config.tabIndex || -1}
                        value={this.state.value}
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    {this.props.children}
                    <span><p>{this.props.config.maxLength - this.state.value.length}</p></span>
                </div>
            </div>
        );
    }
}


export default TextField2;