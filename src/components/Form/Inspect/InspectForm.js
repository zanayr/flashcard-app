import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as create from '../../../store/models/models';
import * as select from '../../../store/reducers/root';
import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import TextField2 from '../../ui/input/Field/TextField2';
import Textarea2 from '../../ui/input/TextArea/Textarea2';
import Button from '../../ui/button/Button/Button';
import TagForm from '../Tag/TagForm';

import styles from './InspectForm.module.css';

class InspectForm extends Component {
    state = {
        item: this.props.item,
        group: this.props.select_user.group,
        reset: false,
        states: {
            group: false,
            tag: false
        },
        tag: this.props.select_user.tag
    }

    //  FORM REFERENCES  -----------------------------------------  FORM REFERENCES  //
    basicsForm = React.createRef();
    groupForm = React.createRef();
    tagForm = React.createRef();


    //  STATE SETTERS  ---------------------------------------------  STATE SETTERS  //
    //  CARD  ---------------------------------------------------------------  CARD  //
    _resetCard () {
        this.setState(prev => ({
            ...prev,
            item: {
                group: [],
                notes: '',
                primary: '',
                secondary: '',
                tag: []
            }
        }));
    }
    _updateCard (target, value) {
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [target]: value
            }
        }));
    }

    //  TAGS  ---------------------------------------------------------------  TAGS  //
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
        const tags = this.state.item[category].filter(t => t !== tag);
        this.props.onChange(category, tags);
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [category]: tags
            }
        }));
    }
    _resetTagForms () {
        this.setState(prev => ({
            ...prev,
            reset: true
        }), () => {
            this.setState(prev => ({
                ...prev,
                reset: false
            }));
        });
    }
    _selectTag (category, tag) {
        const tags = this.state.item[category].concat(tag);
        this.props.onChange(category, tags);
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [category]: tags
            }
        }));
    }
    _resetTags (category, tags) {
        //  Reset the user defined tags (after a new one is added)
        this.setState(prev => ({
            ...prev,
            [category]: tags
        }));
    }

    //  FORM STATES  --------------------------------------------------  FORM STATES //
    _toggleFormState (name) {
        this.setState(prev => ({
            ...prev,
            states: {
                ...prev.states,
                [name]: !prev.states[name]
            }
        }));
    }
    

    //  EVENT HANDLERS  -------------------------------------------  EVENT HANDLERS  //
    //  CARD  ---------------------------------------------------------------  CARD  //
    handle_onCardChange = (target, value) => {
        this._updateCard(target, value);
        this.props.onChange(target, value);
    }
    handle_onCardCreate = () => {
        if (this.basicsForm.current.reportValidity()) {
            //  Retrieve all tags for the new item
            let tags;
            let groups;
            if (this.state.states.tag && this.tagForm.current.tag.value.length) {
                tags = this.tagForm.current.tag.value.trim().split(', ');
                this._checkTags('tag', tags);
            } else {
                tags = this.state.item.tag;
            }
            if (this.state.states.group && this.groupForm.current.tag.value.length) {
                groups = this.groupForm.current.tag.value.trim().split(', ');
                this._checkTags('group', groups);
            } else {
                groups = this.state.item.group;
            }

            //  Build the new item
            const item = create.cardViewModel(utility.createHashId(0), {
                group: groups,
                notes: this.state.item.notes,
                owner: this.props.select_user.id,
                primary: this.state.item.primary,
                secondary: this.state.item.secondary,
                tag: tags
            });

            //  Send the new item up to the create page
            this.props.onConfirm();

            //  Reset the item state, tag forms and form focus
            this._resetTagForms();
            this._resetCard();
            this.basicsForm.current.primary.focus();
        }
    }

    //  TAGS  ---------------------------------------------------------------  TAGS  //
    handle_onTagCreate = (category, tags) => {
        if (tags.length) {
            const allTags = this.state[category].concat(tags);
            tags.forEach(tag => {
                this._selectTag(category, tag);
            });
            this._resetTags(category, allTags);
            this.props.putTag_async(category, this.props.select_token, this.props.select_user.id, allTags);
            //this.props.onTagCreate();
        }
    }
    handle_onTagToggle = (category, tag) => {
        if (!this.state.item[category].includes(tag)) {
            this._selectTag(category, tag);
        } else {
            this._clearTag(category, tag);
        }
    }

    //  FORM STATES  --------------------------------------------------  FORM STATES //
    handle_onStateToggle = (name) => {
        this._toggleFormState(name);
    }


    //  RENDER METHOD  ---------------------------------------------  RENDER METHOD  //
    render () {
        let tagForm = null;
        let groupForm = null;
        
        if (!this.state.reset) {
            tagForm = (
                <TagForm
                    category={'tag'}
                    collection={this.state.tag}
                    selected={this.state.item.tag}
                    tabIndex={4}
                    reference={this.tagForm}
                    onConfirm={(tag) => this.handle_onTagCreate('tag', tag)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('tag')}/>
            );
            groupForm = (
                <TagForm
                    category={'group'}
                    collection={this.state.group}
                    selected={this.state.item.group}
                    tabIndex={5}
                    reference={this.groupForm}
                    onConfirm={(group) => this.handle_onTagCreate('group', group)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('group')}/>
            );
        }
        return (
            <Aux>
                <form
                    className={styles.Basics}
                    ref={this.basicsForm}>
                    <div>
                        <TextField2
                            config={{
                                autoComplete: 'off',
                                label: this.props.primary,
                                maxLength: 32,
                                name: 'primary',
                                tabIndex: 1,
                            }}
                            key='primary'
                            required
                            value={this.state.item.primary}
                            onChange={(value) => this.handle_onCardChange('primary', value)}/>
                        <TextField2
                            config={{
                                autoComplete: 'off',
                                label: this.props.secondary,
                                maxLength: 64,
                                name: 'secondary',
                                tabIndex: 2
                            }}
                            key='secondary'
                            required
                            value={this.state.item.secondary}
                            onChange={(value) => this.handle_onCardChange('secondary', value)}/>
                        <Textarea2
                            config={{
                                autoComplete: 'off',
                                label: 'Notes',
                                maxLength: 128,
                                name: 'notes',
                                tabIndex: 3
                            }}
                            key='note'
                            value={this.state.item.note}
                            onChange={(value) => this.handle_onCardChange('note', value)}/>
                    </div>
                </form>
                {tagForm}
                {groupForm}
                <Button
                    tabIndex={6}
                    onClick={this.handle_onCardCreate}>
                    Create
                </Button>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_token: select.authToken(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InspectForm);