import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as create from '../../../store/models/models';
import * as select from '../../../store/reducers/root';
import * as utility from '../../../utility/utility';

import TextField2 from '../../ui/input/Field/TextField2';
import Button from '../../ui/button/Button/Button';
import TagForm2 from '../../form/Tag/TagForm2';

import styles from './TabForm.module.css';

class TabForm extends Component {
    state = {
        group: [],
        name: '',
        tag: [],
        valid: {
            name: false,
            tag: false
        }
    }

    //  FORM REFERENCES  -----------------------------------------  FORM REFERENCES  //
    nameForm = React.createRef();
    groupForm = React.createRef();
    tagForm = React.createRef();

    componentDidMount () {
        this.nameForm.current.name.focus();
    }

    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    setValid (target, bool) {
        this.setState(prev => ({
            ...prev,
            valid: {
                ...prev.valid,
                [target]: bool
            }
        }));
    }
    //  Name  ---------------------------------------------------------------  Name  //
    _setName (value) {
        this.setState(prev => ({
            ...prev,
            name: value
        }));
    }

    //  Form  //

    //  Tags  ---------------------------------------------------------------  Tags  //
    // _checkTags (category, tags) {
    //     //  Check for new tags that are not included in the user defined tags
    //     const newTags = tags.filter(tag => !this.state[category].includes(tag));
    //     let allTags;
    //     if (newTags.length) {
    //         allTags = this.state[category].concat(newTags);
    //         this._resetTags(category, allTags);
    //         //  Send new tags to the redux store and database
    //         this.props.updateTag_async('user', category, this.props.select_authtoken, this.props.select_authUser, allTags);
    //     }
    // }
    _clearTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].filter(t => t !== tag)
        }));
    }
    // _resetTags (category, tags) {
    //     this.setState(prev => ({
    //         ...prev,
    //         [category]: tags
    //     }));
    // }
    _selectTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    

    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Name  ---------------------------------------------------------------  Name  //
    handle_onNameChange = (value) => {
        this.setValid('name', value.length >= 3);
        this._setName(value);
    }

    //  On Form Confirm  ----------------------------------------------  On Confirm  //
    handle_onStateToggle = (name) => {
        this._toggleFormState(name);
    }
    handle_onFormConfirm = () => {
        // let tags = [];
        // let groups = [];

        // if (this.state.states.tag && this.tagForm.current.reportValidity()) {
        //     tags = this.tagForm.current.tag.value.trim().split(', ');
        //     this._checkTags('tag', tags);
        // } else {
        //     tags = this.state.tag;
        // }
        // if (this.state.states.group && this.groupForm.current.reportValidity()) {
        //     groups = this.groupForm.current.tag.value.trim().split(', ');
        //     this._checkTags('group', groups);
        // } else {
        //     groups = this.state.group;
        // }

        this.props.onConfirm(create.tabViewModel(utility.createHashId(0), {
            active: true,
            group: this.state.group,
            name: this.state.name,
            tag: this.state.tag
        }));
    }

    handle_onTagCreate = (category, tags) => {
        if (tags.length) {
            tags.forEach(tag => {
                this._selectTag(category, tag);
            });
            this.props.updateTag_async('user', category, this.props.select_authtoken, this.props.select_authUser, this.props[category].concat(tags));
            this.setValid('tag', true);
        }
    }
    handle_onTagToggle = (category, tag) => {
        if (!this.state[category].includes(tag)) {
            this.setValid('tag', true);
            this._selectTag(category, tag);
        } else {
            let valid = {
                tag: this.state.tag.length > 0,
                group: this.state.group.length > 0
            }
            valid[category] = this.state[category].length - 1 > 0;
            this.setValid('tag', (valid.tag || valid.group));
            this._clearTag(category, tag);
        }
    }

    render () {
        return (
            <div
                className={styles.TabForm}
                onClick={(e) => e.stopPropagation()}>
                <div>
                    <form ref={this.nameForm}>
                        <div>
                        <TextField2
                            config={{
                                autoComplete: 'off',
                                label: 'Name',
                                maxLength: 24,
                                minLength: 3,
                                name: 'name',
                                tabIndex: 1
                            }}
                            required
                            value={this.state.name}
                            onChange={(value) => this.handle_onNameChange(value)}/>
                        </div>
                    </form>
                    <TagForm2
                        category={'tag'}
                        collection={this.props.tag}
                        selected={this.state.tag}
                        tabIndex={4}
                        reference={this.tagForm}
                        onConfirm={(tag) => this.handle_onTagCreate('tag', tag)}
                        onSelect={this.handle_onTagToggle}
                        onToggle={() => this.handle_onStateToggle('tag')}/>
                    <TagForm2
                        category={'group'}
                        collection={this.props.group}
                        selected={this.state.group}
                        tabIndex={5}
                        reference={this.groupForm}
                        onConfirm={(group) => this.handle_onTagCreate('group', group)}
                        onSelect={this.handle_onTagToggle}
                        onToggle={() => this.handle_onStateToggle('group')}/>
                    <Button
                        disabled={!this.state.valid.name || !this.state.valid.tag}
                        tabIndex={6}
                        onClick={this.handle_onFormConfirm}>
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        select_authtoken: select.authToken(state),
        select_authUser: select.authUser(state),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateTag_async: (store, collection, token, id, tag) => dispatch(actions.updateTag_async(store, collection, token, id, tag))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TabForm);