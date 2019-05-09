import React, {Component} from 'react';

import styles from '../Input/Input.module.css';


class TagEditor extends Component {
    state = {
        value: this.props.value
    }

    handle_onChange = (value) => {
        this.setState({value: value});
    }

    render () {
        return (
            <div className={styles.Field}>
                <div>
                    <label>{this.props.label}</label>
                    <textarea
                        className={styles.Input}
                        placeholder={this.props.label}
                        maxLength={128}
                        name='editor'
                        tabIndex={this.props.tabIndex || -1}
                        value={this.state.value}
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    <span><p>{128 - this.state.value.length}</p></span>
                </div>
            </div>
        );
    }
}


export default TagEditor;