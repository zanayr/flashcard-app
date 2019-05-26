import React, {Component} from 'react';

import Button from '../../button/Button/Button';

import styles from './Search.module.css';

class SearchBar extends Component {
    state = {
        value: ''
    }
    setValue (value) {
        this.setState({value: value});
    }

    handle_onChange = (value) => {
        this.setValue(value);
        this.props.onChange(value);
    }
    render () {
        let clear = null;
        if (this.state.value.length) {
            clear = (
                <Button
                    className={styles.Clear}
                    onClick={() => this.handle_onChange('')}>x</Button>
            );
        }
        return (
            <div className={styles.Search}>
                <div>
                    <input
                        className={styles.Search_Bar}
                        type="text"
                        placeholder="Search"
                        value={this.state.value}
                        onChange={(e) => this.handle_onChange(e.target.value)}/>
                    {clear}
                </div>
            </div>
        );
    }
}

export default SearchBar;