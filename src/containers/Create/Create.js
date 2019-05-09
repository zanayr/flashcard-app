import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as utility from '../../utility/utility';

import Aux from '../../hoc/Aux/Aux';
import CardStack from '../../components/Stack/CardStack';
import TextField from '../../components/ui/input/Field/TextField';
import TextArea from '../../components/ui/input/TextArea/TextArea';
import Button from '../../components/ui/button/Button/Button';
import PinnableTagForm from '../../components/form/Tag/PinnableTagForm';

import styles from './Create.module.css';

class Create extends Component {
    state = {
        card: {
            group: [],
            notes: '',
            primary: '',
            secondary: '',
            tag: []
        },
        cards: [
            {primary: 'wwwwwwwwwwwwwwwwwwwww amet, cons', secondary: 'wwwwwwwwwwwwwwwwwwwww amet, consectetuer adipiscing elit. Aenean', id: '3lkj43', tags:['foo', 'bar']},
            {primary: 'hello', secondary: 'world', id: '8df98s', tags:['foo', 'bar']},
            {primary: 'fizz', secondary: 'buzz', id: 'd8sf7f', tags:['foo', 'bar']}
        ],
        group: this.props.select_user.groups,
        pinned: {
            group: [],
            tag: []
        },
        states: {
            group: false,
            note: true,
            tag: false
        },
        tag: this.props.select_user.tags
    }
    basicsForm = React.createRef();
    groupForm = React.createRef();
    tagForm = React.createRef();

    toggleTag (category, tag) {
        if (!this.state.card[category].includes(tag)) {
            this.setState(prev => ({
                ...prev,
                card: {
                    ...prev.card,
                    [category]: prev.card[category].concat(tag)
                }
            }));
        } else if (!this.state.pinned[category].includes(tag)) {
            this.setState(prev => ({
                ...prev,
                pinned: {
                    ...prev.pinned,
                    [category]: prev.pinned[category].concat(tag)
                }
            }))
        } else {
            this.setState(prev => ({
                ...prev,
                pinned: {
                    ...prev.pinned,
                    [category]: prev.pinned[category].filter(t => t !== tag)
                },
                card: {
                    ...prev.card,
                    [category]: prev.card[category].filter(t => t !== tag)
                }
            }));
        }
    }

    handle_onTagCreate = (category, tag) => {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    handle_onTagToggle = (category, tag) => {
        this.toggleTag(category, tag);
    }
    handle_onStateToggle = (state) => {
        this.setState(prev => ({
            ...prev,
            states: {
                ...prev.states,
                [state]: !prev.states[state]
            }
        }));
    }
    handle_onCardCreate = () => {
        this.basicsForm.current.primary.focus();
    }

    render () {
        let notes = (
            <TextArea
                config={{
                    label: 'Notes',
                    maxLength: 128,
                    placeholder: 'Notes',
                    tabIndex: 3,
                    value: ''
                }}
                key='notes'
                onChange={this.handle_onChange}
                target='notes'>
                <Button
                    className={styles.ToggleButton}
                    onClick={() => this.handle_onStateToggle('note')}>T</Button>
            </TextArea>
        );
        if (!this.state.states.note) {
            let notesCss = [styles.ToggleButton];
            if (!this.state.states.note) {
                notesCss.push(styles.Second);
            }
            notes = (
                <div className={styles.NotesField}>
                    <div>
                        <p>Notes</p>
                        <Button
                            className={notesCss.join(' ')}
                            onClick={() => this.handle_onStateToggle('note')}>T</Button>
                    </div>
                </div>
            );
        }
        return (
            <main className={styles.Creator}>
                <div>
                    <section className={styles.Editor}>
                        <div>
                            <div className={styles.Wrapper}>
                                <form
                                    className={styles.Basics}
                                    ref={this.basicsForm}>
                                    <div>
                                        <TextField
                                            config={{
                                                label: 'Front',
                                                maxLength: 32,
                                                minLength: 6,
                                                name: 'primary',
                                                placeholder: 'Front',
                                                tabIndex: 1,
                                                value: ''
                                            }}
                                            key='primary'
                                            onChange={this.handle_onChange}
                                            required
                                            target='primary'/>
                                        <TextField
                                            config={{
                                                label: 'Back',
                                                maxLength: 64,
                                                placeholder: 'Back',
                                                tabIndex: 2,
                                                value: ''
                                            }}
                                            key='secondary'
                                            onChange={this.handle_onChange}
                                            required
                                            target='secondary'/>
                                        {notes}
                                    </div>
                                </form>
                                <PinnableTagForm
                                    category='tag'
                                    collection={this.state.tag}
                                    pinned={this.state.pinned.tag}
                                    selected={this.state.card.tag}
                                    state={this.state.states.tag}
                                    tabIndex={4}
                                    onSelect={this.handle_onTagToggle}
                                    onToggle={() => this.handle_onStateToggle('tag')}>
                                </PinnableTagForm>
                                <PinnableTagForm
                                    category='group'
                                    collection={this.state.group}
                                    pinned={this.state.pinned.group}
                                    selected={this.state.card.group}
                                    state={this.state.states.group}
                                    tabIndex={5}
                                    onSelect={this.handle_onTagToggle}
                                    onToggle={() => this.handle_onStateToggle('group')}>
                                </PinnableTagForm>
                                <Button
                                    tabIndex={6}
                                    onClick={this.handle_onCardCreate}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Board}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CardStack collection={this.state.cards}/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
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
        patchItem_async: (url, token, item) => dispatch(actions.patchItem_async(url, token, item)),
        putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Create);