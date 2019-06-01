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
        //  Check for new tags that are not included in the user defined tags
        const newTags = tags.filter(tag => !this.props.collection.includes(tag));
        if (newTags.length) {
            //  Send new tags to the redux store and database
            return newTags;
        }
        return [];
    }

    handle_onChange = (value) => {
        this.setState({value: value});
    }
    handle_onConfirm = () => {
        const tags = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tags.map(t => {
                return t.replace(' ', '_').toLowerCase();
            })));
            this._resetValue();
        }
    }

    render () {
        let content = (
            <Aux>
                <div className={styles.TagBar}>
                    <div>
                        {utility.sortByAlpha_asc(this.props.collection).map((tag, i) => {
                            return (
                                <SelectTag
                                    key={utility.createHashId(i)}
                                    pinned={this.props.pinned.includes(tag)}
                                    selected={this.props.selected.includes(tag)}
                                    onToggle={(tag) => this.props.onSelect(this.props.category, tag)}>
                                    {tag}
                                </SelectTag>
                            )
                        })}
                    </div>
                </div>
                <CountingTextField
                    label={'new ' + this.props.category}
                    tabIndex={-1}
                    value={this.state.value}
                    onChange={this.handle_onChange}>
                    <Button
                        className={styles.AddButton}
                        tabIndex={-1}
                        onClick={this.handle_onConfirm}>
                        +
                    </Button>
                </CountingTextField>
            </Aux>
        );
        let toggle = null;
        if (this.props.state) {
            content = (
                <TagEditor
                    label={this.props.category}
                    tabIndex={this.props.tabIndex}
                    value={this.props.pinned.join(', ')}
                    onChange={this.handle_onChange}/>
            );
        }
        if (this.props.onToggle) {
            let css = [styles.ToggleButton];
            if (this.props.state) {
                css.push(styles.Second);
            }
            toggle = (
                <Button
                    className={css.join(' ')}
                    tabIndex={-1}
                    onClick={this.props.onToggle}>T</Button>
            )
        }
        return (
            <form
                className={styles.TagForm2}
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