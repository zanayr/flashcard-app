import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as create from '../../store/models/models';
import * as select from '../../store/reducers/root';
import * as utility from '../../utility/utility';

import Aux from '../../hoc/Aux/Aux';
import Throbber from '../../components/ui/Throbber/Throbber';
import CardStack from '../../components/Stack/CardStack';
import TextField2 from '../../components/ui/input/Field/TextField2';
import Textarea2 from '../../components/ui/input/TextArea/Textarea2';
import Button from '../../components/ui/button/Button/Button';
import PinnableTagForm from '../../components/form/Tag/PinnableTagForm';

import styles from './Create.module.css';

class Create extends Component {
    state = {
        cards: [],
        group: this.props.select_user.groups,
        isReloading: false,
        pinned: {
            group: [],
            tag: []
        },
        selected: {
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
        if (!this.state.selected[category].includes(tag)) {
            this.setState(prev => ({
                ...prev,
                selected: {
                    ...prev.selected,
                    [category]: prev.selected[category].concat(tag)
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
                    ...prev.selected,
                    [category]: prev.selected[category].filter(t => t !== tag)
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
        if (this.basicsForm.current.reportValidity()) {
            const card = create.displayCardViewModel({
                id: utility.createHashId(0),
                primary: this.basicsForm.current.primary.value,
                secondary: this.basicsForm.current.secondary.value,
                tag: this.state.selected.tag.filter(tag => !this.state.pinned.tag.includes(tag)).concat(this.state.pinned.tag)
            });
            const cards = this.state.cards.map(c => {
                c.flipped = false;
                c.top = false;
                return c
            });
            card.top = true;
            cards.unshift(card);
            this.setState(prev => ({
                ...prev,
                isReloading: true
            }));
            this.setState(prev => ({
                ...prev,
                cards: cards
            }), () => {
                this.setState(prev => ({
                    ...prev,
                    isReloading: false
                }));
            });
            this.setState(prev => ({
                ...prev,
                selected: {
                    group: [],
                    tag: []
                }
            }));
            this.basicsForm.current.primary.focus();
        }
    }

    render () {
        let notes = (
            <Textarea2
                config={{
                    autoComplete: 'off',
                    label: 'Notes',
                    maxLength: 128,
                    name: 'notes',
                    tabIndex: 3
                }}
                key='notes'
                value={''}>
                <Button
                    className={styles.ToggleButton}
                    onClick={() => this.handle_onStateToggle('note')}>T</Button>
            </Textarea2>
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
        let form = (<Throbber/>)
        if (!this.state.isReloading) {
            form = (
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
                                value={''}/>
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
                                value={''}/>
                            {notes}
                        </div>
                    </form>
                    <PinnableTagForm
                        category='tag'
                        collection={this.state.tag}
                        pinned={this.state.pinned.tag}
                        selected={this.state.selected.tag}
                        state={this.state.states.tag}
                        tabIndex={4}
                        onSelect={this.handle_onTagToggle}
                        onToggle={() => this.handle_onStateToggle('tag')}>
                    </PinnableTagForm>
                    <PinnableTagForm
                        category='group'
                        collection={this.state.group}
                        pinned={this.state.pinned.group}
                        selected={this.state.selected.group}
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
                </Aux>
            );
        }
        return (
            <main className={styles.Creator}>
                <div>
                    <section className={styles.Editor}>
                        <div>
                            <div className={styles.Wrapper}>
                                {form}
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