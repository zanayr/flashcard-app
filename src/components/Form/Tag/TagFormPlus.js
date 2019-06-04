import React, {Component} from 'react';
import * as utility from '../../../utility/utility';

import CountingTextField from '../../ui/input/Field/CountingTextField';
import SelectTag from '../../ui/Tag/SelectTag';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class TagFormPlus extends Component {
    state = {
        state: false,
        value: ''
    }

    
    //  STATE SETTERS  ---------------------------------------------------  SETTERS  //
    //  Value  -------------------------------------------------------------  Value  //
    _resetValue () {
        this.setState({value: ''});
    }

    //  State  -------------------------------------------------------------  State  //
    _toggleState () {
        this.setState(prev => ({
            ...prev,
            state: !prev.state
        }));
    }


    //  PRIVATE METHODS  -----------------------------------------  PRIVATE METHODS  //
    //  Tags  ---------------------------------------------------------------  Tags  //
    _checkTags (tags) {
        const newTags = tags.filter(tag => !this.props.collection.includes(tag));
        if (newTags.length) {
            return newTags;
        }
        return [];
    }


    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  On Value Change  -----------------------------------------------  On Change  //
    handle_onChange = (value) => {
        this.setState({value: value});
    }

    //  On Form Confirm -----------------------------------------------  On Confirm  //
    handle_onConfirm = () => {
        const tags = this.props.reference.current.tag.value.split(', ');
        if (this.props.reference.current.reportValidity()) {
            this.props.onConfirm(this._checkTags(tags.map(t => {
                return t.replace(' ', '_').toLowerCase();
            })));
            this._resetValue();
        }
    }

    //  On Form Toggle  ------------------------------------------------  On Toggle  //
    handle_onToggle = () => {
        this._toggleState();
        this.props.onToggle();
    }


    //  RENDER METHOD  ----------------------------------------------------  RENDER  //
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
                            pattern: '[a-zA-z0-9 -.]+',
                            tabIndex: this.props.tabIndex
                        }}
                        value={this.state.value}
                        onChange={this.handle_onChange}>
                        <Button
                            disabled={!(this.state.value.length > 2)}
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