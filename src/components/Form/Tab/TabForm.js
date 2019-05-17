import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as create from '../../../store/models/models';
import * as select from '../../../store/reducers/root';
import * as utility from '../../../utility/utility';

import TextField2 from '../../ui/input/Field/TextField2';
import Button from '../../ui/button/Button/Button';
import TagForm from '../../form/Tag/TagForm';

import styles from './TabForm.module.css';

class TabForm extends Component {
    state = {
        group: this.props.select_user.group,
        name: '',
        tag: this.props.select_user.tag,
        selected: {
            group: [],
            tag: []
        },
        states: {
            tag: false,
            group: false
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
    //  Name  ---------------------------------------------------------------  Name  //
    _setName (value) {
        this.setState(prev => ({
            ...prev,
            name: value
        }));
    }

    //  Form  //
    _toggleFormState (name) {
        this.setState(prev => ({
            ...prev,
            states: {
                ...prev.states,
                [name]: !prev.states[name]
            }
        }));
    }

    //  Tags  ---------------------------------------------------------------  Tags  //
    _checkTags (category, tags) {
        //  Check for new tags that are not included in the user defined tags
        const newTags = tags.filter(tag => !this.state[category].includes(tag));
        let allTags;
        if (newTags.length) {
            allTags = this.state[category].concat(newTags);
            this._resetTags(category, allTags);
            //  Send new tags to the redux store and database
            this.props.putTag_async(category, this.props.select_token, this.props.select_user.id, allTags);
        }
    }
    _clearTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            selected: {
                ...prev.selected,
                [category]: prev.selected[category].filter(t => t !== tag)
            }
        }));
    }
    _resetTags (category, tags) {
        this.setState(prev => ({
            ...prev,
            [category]: tags
        }));
    }
    _selectTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            selected: {
                ...prev.selected,
                [category]: prev.selected[category].concat(tag)
            }
        }));
    }
    

    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  Name  ---------------------------------------------------------------  Name  //
    handle_onNameChange = (value) => {
        this._setName(value);
    }

    //  On Form Confirm  ----------------------------------------------  On Confirm  //
    handle_onStateToggle = (name) => {
        this._toggleFormState(name);
    }
    handle_onFormConfirm = () => {
        let tags = [];
        let groups = [];

        if (this.state.states.tag && this.tagForm.current.reportValidity()) {
            tags = this.tagForm.current.tag.value.trim().split(', ');
            this._checkTags('tag', tags);
        } else {
            tags = this.state.selected.tag;
        }
        if (this.state.states.group && this.groupForm.current.reportValidity()) {
            groups = this.groupForm.current.tag.value.trim().split(', ');
            this._checkTags('group', groups);
        } else {
            groups = this.state.selected.group;
        }

        this.props.onConfirm(create.tabViewModel(utility.createHashId(0), {
            active: true,
            group: groups,
            name: this.state.name,
            tag: tags
        }));
    }

    handle_onTagCreate = (category, tags) => {
        if (tags.length) {
            const allTags = this.state[category].concat(tags);
            tags.forEach(tag => {
                this._selectTag(category, tag);
            });
            this._resetTags(category, allTags);
        }
        console.log(tags);
        this.props.putTag_async(category, this.props.select_token, this.props.select_user.id, this.state[category].concat(tags));
    }
    handle_onTagToggle = (category, tag) => {
        if (!this.state.selected[category].includes(tag)) {
            this._selectTag(category, tag);
        } else {
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
                    <TagForm
                        category={'tag'}
                        collection={this.state.tag}
                        selected={this.state.selected.tag}
                        tabIndex={4}
                        reference={this.tagForm}
                        onConfirm={(tag) => this.handle_onTagCreate('tag', tag)}
                        onSelect={this.handle_onTagToggle}
                        onToggle={() => this.handle_onStateToggle('tag')}/>
                    <TagForm
                        category={'group'}
                        collection={this.state.group}
                        selected={this.state.selected.group}
                        tabIndex={5}
                        reference={this.groupForm}
                        onConfirm={(group) => this.handle_onTagCreate('group', group)}
                        onSelect={this.handle_onTagToggle}
                        onToggle={() => this.handle_onStateToggle('group')}/>
                    <Button
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
        select_token: select.authToken(state),
        select_user: select.user(state),
        select_userId: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        putTag_async: (category, token, user, tab) => dispatch(actions.putTag_async(category, token, user, tab))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TabForm);