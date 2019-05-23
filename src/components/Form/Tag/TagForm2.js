import React, {Component} from 'react';
import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import TagField2 from '../../ui/input/Tag/TagField2';
import TagEditor from '../../ui/input/Tag/TagEditor';
import Tag2 from '../../ui/Tag/Tag2';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class TagForm2 extends Component {
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
                <div className={styles.TagBar}>
                    <div>
                        {utility.sortByAlpha_asc(this.props.collection).map((tag, i) => {
                            return (
                                <Tag2
                                    key={utility.createHashId(i)}
                                    selected={this.props.selected.includes(tag)}
                                    onToggle={(tag) => this.props.onSelect(this.props.category, tag)}>
                                    {tag}
                                </Tag2>
                            )
                        })}
                    </div>
                </div>
                <TagField2
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
                </TagField2>
                </div>
            </form>
        );
    }
}


export default TagForm2;