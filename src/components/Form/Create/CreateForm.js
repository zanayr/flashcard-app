import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as create from '../../../store/models/models';
import * as select from '../../../store/reducers/root';
import * as utility from '../../../utility/utility';

import Aux from '../../../hoc/Aux/Aux';
import CountingTextField from '../../ui/input/Field/CountingTextField';
import Textarea from '../../ui/input/TextArea/Textarea';
import Button from '../../ui/button/Button/Button';
import PinnableTagForm from '../Tag/PinnableTagForm';

import styles from './CreateForm.module.css';

class CreateForm extends Component {
    state = {
        card: {
            group: [],
            note: '',
            primary: '',
            secondary: '',
            tag: []
        },
        group: this.props.select_user.group,
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
                note: '',
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
            this.props.updateTag_async('user', category, this.props.select_authToken, this.props.select_authUser, allTags);
        }
        return tags;
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
    handle_onCardClear = () => {
        this._resetTagForms();
        this._resetCard();
        this.basicsForm.current.primary.focus();
    }
    handle_onCardCreate = () => {
        if (this.basicsForm.current.reportValidity()) {
            //  Retrieve all tags for the new card
            let tags;
            let groups;
            if (this.state.states.tag && this.tagForm.current.tag.value.length) {
                tags = this._checkTags('tag', this.tagForm.current.tag.value.trim().split(', ').map(tag => {
                    return tag.replace(' ', '_').toLowerCase();
                }));
            } else {
                tags = this.state.card.tag.filter(tag => !this.state.pinned.tag.includes(tag)).concat(this.state.pinned.tag);
            }
            if (typeof this.props.deck === 'undefined') {
                tags.concat('$unassinged');
            }
            if (this.state.states.group && this.groupForm.current.tag.value.length) {
                groups = this._checkTags('group', this.tagForm.current.tag.value.trim().split(', ').map(tag => {
                    return tag.replace(' ', '_').toLowerCase();
                }));
            } else {
                groups = this.state.card.group.filter(group => !this.state.pinned.group.includes(group)).concat(this.state.pinned.group);
            }
            //  Build the new card
            const card = create.itemViewModel(utility.createHashId(0), {
                group: groups,
                member: [this.props.deck],
                note: this.state.card.note,
                owner: this.props.select_authUser,
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
            this.props.updateTag_async('user', category, this.props.select_authToken, this.props.select_authUser, allTags);
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
        let note;
        let tagForm = null;
        let groupForm = null;
        let formCSS = {
            add: styles.Create_Add,
            input: styles.Create_Input,
            pinned: styles.Create_Pinned,
            selected: styles.Create_Selected,
            tag: styles.Create_Tag,
            toggle: styles.Create_Toggle
        };
        if (this.state.states.note) {
            note = (
                <Textarea
                    config={{
                        autoComplete: 'off',
                        label: 'Notes',
                        maxLength: 128,
                        name: 'note',
                        tabIndex: 3
                    }}
                    key='note'
                    value={this.state.card.note}
                    onChange={(value) => this.handle_onCardChange('note', value)}>
                    <Button
                        className={styles.Toggle}
                        onClick={() => this.handle_onStateToggle('note')}>-</Button>
                </Textarea>
            );
        } else {
            note = (
                <div className={styles.NotesField}>
                    <div>
                        <p className={styles.Message}>Add Notes</p>
                        <Button
                            className={[styles.Toggle, styles.Second].join(' ')}
                            onClick={() => this.handle_onStateToggle('note')}>+</Button>
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
                    styles={formCSS}
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
                    styles={formCSS}
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
                        <p className={styles.Message}>Add cards quickly below, don't forget that they require a front and back.</p>
                        <CountingTextField
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
                        <CountingTextField
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
                        {note}
                    </div>
                </form>
                {tagForm}
                {groupForm}
                <div className={styles.Interface}>
                    <div>
                    <Button
                        disabled={!this.state.card.primary.length || !this.state.card.secondary.length}
                        tabIndex={6}
                        onClick={this.handle_onCardCreate}>
                        Create
                    </Button>
                    <Button
                        tabIndex={-1}
                        onClick={this.handle_onCardClear}>
                        Clear
                    </Button>
                    </div>
                </div>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_user: select.user(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateTag_async: (store, collection, token, id, tag) => dispatch(actions.updateTag_async(store, collection, token, id, tag)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);