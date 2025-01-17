import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import * as select from '../../../store/reducers/root';

import Aux from '../../../hoc/Aux/Aux';
import CountingTextField from '../../ui/input/Field/CountingTextField';
import Textarea from '../../ui/input/TextArea/TextArea';
import TagFormPlus from '../Tag/TagFormPlus';


class InspectForm extends Component {
    state = {
        item: this.props.data,
        group: this.props.select_user.group,
        reset: false,
        states: {
            group: false,
            tag: false
        },
        tag: this.props.select_user.tag
    }

    componentDidMount () {
        if (this.basicsForm.current) {
            this.basicsForm.current.primary.focus();
        }
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
            this.props.updateTag_async('user', category, this.props.select_authToken, this.props.select_authUser, allTags);
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
    _resetTagForm2s () {
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
    _checkTagFieldValidity () {
        const regex = /^[a-zA-Z0-9 ,]+$/
        let valid = true;
        if (this.state.states.group && !this.groupForm.current.tag.value.match(regex)) {
            valid = false;
        }
        if (this.state.states.tag && !this.tagForm.current.tag.value.match(regex)) {
            valid = false;
        }
        return valid;
    }
    handle_onConfirmClick = () => {
        if (this.basicsForm.current.reportValidity() && this._checkTagFieldValidity()) {
            //  Retrieve all tags for the new item
            let tag;
            let group;
            if (this.state.states.tag && this.tagForm.current.tag.value.length) {
                tag = this.tagForm.current.tag.value.trim().split(', ');
                this._checkTags('tag', tag.map(t => {
                    return t.replace(' ', '_').toLowerCase();
                }));
            } else {
                tag = this.state.item.tag;
            }
            if (this.state.states.group && this.groupForm.current.tag.value.length) {
                group = this.groupForm.current.tag.value.trim().split(', ');
                this._checkTags('group', group.map(g => {
                    return g.replace(' ', '_').toLowerCase();
                }));
            } else {
                group = this.state.item.group;
            }
            this.props.onConfirm();
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
            this.props.updateTag_async('user', category, this.props.select_authToken, this.props.select_authUser, allTags);
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
                <TagFormPlus
                    category={'tag'}
                    collection={this.state.tag}
                    selected={this.state.item.tag}
                    styles={this.props.styles}
                    tabIndex={4}
                    reference={this.tagForm}
                    onConfirm={(tag) => this.handle_onTagCreate('tag', tag)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('tag')}/>
            );
            groupForm = (
                <TagFormPlus
                    category={'group'}
                    collection={this.state.group}
                    selected={this.state.item.group}
                    styles={this.props.styles}
                    tabIndex={5}
                    reference={this.groupForm}
                    onConfirm={(group) => this.handle_onTagCreate('group', group)}
                    onSelect={this.handle_onTagToggle}
                    onToggle={() => this.handle_onStateToggle('group')}/>
            );
        }
        return (
            <Aux>
                <form ref={this.basicsForm}>
                    <div>
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: this.props.labels.primary,
                                maxLength: 32,
                                name: 'primary',
                                tabIndex: 1,
                            }}
                            key='primary'
                            required
                            value={this.state.item.primary}
                            onChange={(value) => this.handle_onCardChange('primary', value)}/>
                        <CountingTextField
                            config={{
                                autoComplete: 'off',
                                label: this.props.labels.secondary,
                                maxLength: 64,
                                name: 'secondary',
                                tabIndex: 2
                            }}
                            key='secondary'
                            required
                            value={this.state.item.secondary}
                            onChange={(value) => this.handle_onCardChange('secondary', value)}/>
                        <Textarea
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


export default connect(mapStateToProps, mapDispatchToProps)(InspectForm);