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
import PinnableTagForm from '../Tag/PinnableTagForm';

import styles from './CreateForm.module.css';

class CreateForm extends Component {
    state = {
        card: {
            group: [],
            notes: '',
            primary: '',
            secondary: '',
            tag: []
        },
        group: this.props.select_user.group,
        isReloading: false,
        pinned: {
            group: [],
            tag: []
        },
        reset: false,
        states: {
            group: false,
            note: false,
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
            card: {
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
            card: {
                ...prev.card,
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
            this._setTags(category, allTags);
            //  Send new tags to the redux store and database
            this.props.putTag_async(category, this.props.select_token, this.props.select_user.id, allTags);
        }
    }
    _clearTag (category, tag) {
        //  Remove tag from both the card and the pinned categories
        this.setState(prev => ({
            ...prev,
            card: {
                ...prev.card,
                [category]: prev.card[category].filter(t => t !== tag)
            }
        }));
        this.setState(prev => ({
            ...prev,
            pinned: {
                ...prev.pinned,
                [category]: prev.pinned[category].filter(t => t !== tag)
            }
        }));
    }
    _pinTag (category, tag) {
        //  Place tag into the pinned tag category
        this.setState(prev => ({
            ...prev,
            pinned: {
                ...prev.pinned,
                [category]: prev.pinned[category].concat(tag)
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
        //  Place tag into the cards tag category
        this.setState(prev => ({
            ...prev,
            card: {
                ...prev.card,
                [category]: prev.card[category].concat(tag)
            }
        }));
    }
    _setTags (category, tags) {
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
    }
    handle_onCardCreate = () => {
        if (this.basicsForm.current.reportValidity()) {
            //  Retrieve all tags for the new card
            let tags;
            let groups;
            if (this.state.states.tag && this.tagForm.current.tag.value.length) {
                tags = this.tagForm.current.tag.value.trim().split(', ');
                this._checkTags('tag', tags);
            } else {
                tags = this.state.card.tag.filter(tag => !this.state.pinned.tag.includes(tag)).concat(this.state.pinned.tag);
            }
            if (typeof this.props.deck === 'undefined') {
                tags.concat('$unassinged');
            }
            if (this.state.states.group && this.groupForm.current.tag.value.length) {
                groups = this.groupForm.current.tag.value.trim().split(', ');
                this._checkTags('group', groups);
            } else {
                groups = this.state.card.group.filter(group => !this.state.pinned.group.includes(group)).concat(this.state.pinned.group);
            }

            //  Build the new card
            const card = create.cardViewModel(utility.createHashId(0), {
                group: groups,
                notes: this.state.card.notes,
                owner: this.props.select_user.id,
                primary: this.state.card.primary,
                secondary: this.state.card.secondary,
                tag: tags
            });

            //  Send the new card up to the create page
            this.props.onCreate(card);

            //  Reset the card state, tag forms and form focus
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
            this._setTags(category, allTags);
            this.props.putTag_async(category, this.props.select_token, this.props.select_user.id, allTags);
        }
        
    }
    handle_onTagToggle = (category, tag) => {
        if (!this.state.card[category].includes(tag)) {
            this._selectTag(category, tag);
        } else if (!this.state.pinned[category].includes(tag)) {
            this._pinTag(category, tag);
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
        let notes;
        let tagForm = null;
        let groupForm = null;
        if (this.state.states.note) {
            notes = (
                <Textarea2
                    config={{
                        autoComplete: 'off',
                        label: 'Notes',
                        maxLength: 128,
                        name: 'notes',
                        tabIndex: 3
                    }}
                    key='notes'
                    value={this.state.card.notes}
                    onChange={(value) => this.handle_onCardChange('notes', value)}>
                    <Button
                        className={styles.ToggleButton}
                        onClick={() => this.handle_onStateToggle('note')}>T</Button>
                </Textarea2>
            );
        } else {
            notes = (
                <div className={styles.NotesField}>
                    <div>
                        <p>Add Notes</p>
                        <Button
                            className={[styles.ToggleButton, styles.Second].join(' ')}
                            onClick={() => this.handle_onStateToggle('note')}>T</Button>
                    </div>
                </div>
            );
        }
        if (!this.state.reset) {
            tagForm = (
                <PinnableTagForm
                    category='tag'
                    collection={this.state.tag}
                    pinned={this.state.pinned.tag}
                    selected={this.state.card.tag}
                    state={this.state.states.tag}
                    tabIndex={4}
                    reference={this.tagForm}
                    onConfirm={(tag) => this.handle_onTagCreate('tag', tag)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('tag')}>
                </PinnableTagForm>
                
            );
            groupForm = (
                <PinnableTagForm
                    category='group'
                    collection={this.state.group}
                    pinned={this.state.pinned.group}
                    selected={this.state.card.group}
                    state={this.state.states.group}
                    tabIndex={5}
                    reference={this.groupForm}
                    onConfirm={(tag) => this.handle_onTagCreate('group', tag)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('group')}>
                </PinnableTagForm>
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
                                label: 'Front',
                                maxLength: 32,
                                name: 'primary',
                                tabIndex: 1,
                            }}
                            key='primary'
                            required
                            value={this.state.card.primary}
                            onChange={(value) => this.handle_onCardChange('primary', value)}/>
                        <TextField2
                            config={{
                                autoComplete: 'off',
                                label: 'Back',
                                maxLength: 64,
                                name: 'secondary',
                                tabIndex: 2
                            }}
                            key='secondary'
                            required
                            value={this.state.card.secondary}
                            onChange={(value) => this.handle_onCardChange('secondary', value)}/>
                        {notes}
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);