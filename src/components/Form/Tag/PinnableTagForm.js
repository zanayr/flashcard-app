import React, {Component} from 'react';
import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import CountingTextField from '../../ui/input/Field/CountingTextField';
import TagEditor from '../../ui/input/Tag/TagEditor';
import SelectTag from '../../ui/Tag/SelectTag';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class PinnableTagForm extends Component {
    state = {
        value: ''
    }

    _resetValue () {
        this.setState({value: ''});
    }
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

    handle_onChange = (value) => {
        this.setState({value: value});
    }
    handle_onConfirm = () => {
        const tags = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tags.map(t => {
                return t.trim().replace(/\s\s+/, '_').toLowerCase();
            })));
            this._resetValue();
        }
    }

    render () {
        let content = (
            <Aux>
                <div className={styles.Container}>
                    <div>
                        {utility.sortByAlpha_asc(this.props.collection).map((tag, i) => {
                            return (
                                <SelectTag
                                    className={this.props.styles}
                                    key={utility.createHashId(i)}
                                    pinned={this.props.pinned.includes(tag)}
                                    selected={this.props.selected.includes(tag)}
                                    onToggle={() => this.props.onSelect(this.props.category, tag)}>
                                    {tag}
                                </SelectTag>
                            )
                        })}
                    </div>
                </div>
                <CountingTextField
                    className={this.props.styles.input}
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
            </Aux>
        );
        let toggle = null;
        let toggleCSS = [styles.Toggle, this.props.styles.toggle];
        if (this.props.state) {
            content = (
                <TagEditor
                    className={this.props.styles.input}
                    label={this.props.category}
                    pattern={'/^[a-zA-Z0-9-., ]+$'}
                    tabIndex={this.props.tabIndex}
                    value={this.props.pinned.join(', ')}
                    onChange={this.handle_onChange}/>
            );
        }
        if (this.props.state) {
            toggleCSS.push(styles.Second);
        }
        toggle = (
            <Button
                className={toggleCSS.join(' ')}
                tabIndex={-1}
                onClick={this.props.onToggle}>+</Button>
        );


        return (
            <form
                className={styles.PinnableTagForm}
                ref={this.props.reference}>
                <div>
                    {content}
                    {toggle}
                </div>
            </form>
        );
    }
}


export default PinnableTagForm;