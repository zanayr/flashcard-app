import React, {Component} from 'react';

import styles from '../Input/Input.module.css';


class TagField2 extends Component {
    state = {
        value: ''
    }

    handle_onChange = (value) => {
        this.setState({value: value})
    }

    render () {
        return (
            <div className={styles.Field}>
                <div>
                    <label>{this.props.label}</label>
                    <input
                        className={styles.Input}
                        maxLength={24}
                        placeholder={this.props.label}
                        required
                        type='text'
                        value={this.state.value}
                        name='tag'
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    {this.props.children}
                    <span><p>{24 - this.state.value.length}</p></span>
                </div>
            </div>
        );
    }
}


export default TagField2;