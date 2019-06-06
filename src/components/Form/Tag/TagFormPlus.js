import React, {Component} from 'react';
import * as utility from '../../../utility/utility';

import CountingTextField from '../../ui/input/Field/CountingTextField';
import SelectTag from '../../ui/Tag/SelectTag';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class TagFormPlus extends Component {
    state = {
        value: ''
    }
    //  Set Value
    setValue (value) {
        this.setState({value: value});
    }


    //  Check tags for new tags
    _checkTags (tags) {
        const newTags = tags.filter(tag => !this.props.collection.includes(tag));
        if (newTags.length) {
            return newTags;
        }
        return [];
    }
    _checkValidity () {
        let valid = true;
        if (this.state.value.length < 3 && valid) {
            valid = false;
        }
        if (!/^[a-zA-Z0-9-. ]+$/.test(this.state.value) && valid) {
            valid = false;
        }
        return valid;
    }

    //  Handle input value change
    handle_onChange = (value) => {
        this.setValue(value);
    }

    //  Handle confirmation button click
    handle_onConfirm = () => {
        const tags = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tags.map(t => {
                return t.trim().replace(/\s\s+/, '_').toLowerCase();
            })));
            this.setValue('');
        }
    }

    //  Render method
    render () {
        return (
            <form
                className={styles.TagForm2}
                ref={this.props.reference}>
                <div>
                    <div className={styles.Container}>
                        <div>
                            {utility.sortByAlpha_asc(this.props.collection).map((tag, i) => {
                                return (
                                    <SelectTag
                                        className={this.props.styles}
                                        key={utility.createHashId(i)}
                                        selected={this.props.selected.includes(tag)}
                                        onToggle={() => this.props.onSelect(this.props.category, tag)}>
                                        {tag}
                                    </SelectTag>
                                )
                            })}
                        </div>
                    </div>
                    <CountingTextField
                        config={{
                            autoComplete: 'off',
                            label: 'new ' + this.props.category,
                            maxLength: 24,
                            minLength: 3,
                            name: 'tag',
                            pattern: '^[a-zA-Z0-9-. ]+$',
                            tabIndex: this.props.tabIndex
                        }}
                        value={this.state.value}
                        onChange={this.handle_onChange}>
                        <Button
                            disabled={!this._checkValidity()}
                            className={[styles.Add, this.props.styles.add].join(' ')}
                            tabIndex={-1}
                            onClick={this.handle_onConfirm}>
                            +
                        </Button>
                    </CountingTextField>
                </div>
            </form>
        );
    }
}


export default TagFormPlus;