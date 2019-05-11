import React, {Component, PureComponent} from 'react';
// import {connect} from 'react-redux';

// import * as actions from '../../store/actions/index';
// import * as create from '../../store/models/models';
// import * as select from '../../store/reducers/root';
// import * as utility from '../../utility/utility';

// import Aux from '../../hoc/Aux/Aux';
// import Throbber from '../../components/ui/Throbber/Throbber';
import CreateForm from '../../components/form/Create/CreateForm';
import CardStack from '../../components/Stack/CardStack';
// import TextField2 from '../../components/ui/input/Field/TextField2';
// import Textarea2 from '../../components/ui/input/TextArea/Textarea2';
// import Button from '../../components/ui/button/Button/Button';
// import PinnableTagForm from '../../components/form/Tag/PinnableTagForm';

import styles from './Create.module.css';

class Create extends Component {
    state = {
        cards: []
    }

    _addCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.concat(card)
        }));
    }
    _removeCard (card) {
        this.setState(prev => ({
            ...prev,
            cards: prev.cards.filter(c => c.id !== card.id)
        }));
    }
    // _toggleTag (category, tag) {
    //     if (!this.state.selected[category].includes(tag)) {
    //         this.setState(prev => ({
    //             ...prev,
    //             selected: {
    //                 ...prev.selected,
    //                 [category]: prev.selected[category].concat(tag)
    //             }
    //         }));
    //     } else if (!this.state.pinned[category].includes(tag)) {
    //         this.setState(prev => ({
    //             ...prev,
    //             pinned: {
    //                 ...prev.pinned,
    //                 [category]: prev.pinned[category].concat(tag)
    //             }
    //         }))
    //     } else {
    //         this.setState(prev => ({
    //             ...prev,
    //             pinned: {
    //                 ...prev.pinned,
    //                 [category]: prev.pinned[category].filter(t => t !== tag)
    //             },
    //             selected: {
    //                 ...prev.selected,
    //                 [category]: prev.selected[category].filter(t => t !== tag)
    //             }
    //         }));
    //     }
    // }
    // _setTags (category, tags) {
    //     this.setState(prev => ({
    //         ...prev,
    //         [category]: tags
    //     }));
    // }

    // _checkForNewTags (category, tags) {
    //     const newTags = tags.filter(tag => !this.state[category].includes(tag));
    //     let allTags;
    //     if (newTags.length) {
    //         allTags = this.state[category].concat(newTags);
    //         this._setTags(category, allTags);
    //         //this.props.putTag_async(category, this.props.token, this.props.user.id, allTags);
    //     }
    // }

   

    // handle_onTagCreate = (category, tag) => {
    //     this.setState(prev => ({
    //         ...prev,
    //         [category]: prev[category].concat(tag)
    //     }));
    // }
    // handle_onTagToggle = (category, tag) => {
    //     this._toggleTag(category, tag);
    // }
    // handle_onStateToggle = (state) => {
    //     this.setState(prev => ({
    //         ...prev,
    //         states: {
    //             ...prev.states,
    //             [state]: !prev.states[state]
    //         }
    //     }));
    // }
    

    handle_onCardCreate = (card) => {
        // if (this.basicsForm.current.reportValidity()) {
        //     let tags = [];
        //     let groups = [];
        //     if (this.state.states.tag && this.tagForm.current.tag.value.length) {
        //         tags = this.tagForm.current.tag.value.trim().split(', ');
        //         this._checkForNewTags('tag', tags);
        //     } else {
        //         tags = this.state.selected.tag.filter(tag => !this.state.pinned.tag.includes(tag)).concat(this.state.pinned.tag);
        //     }
        //     if (this.state.states.group && this.groupForm.current.tag.value.length) {
        //         groups = this.groupForm.current.tag.value.trim().split(', ');
        //         this._checkForNewTags('group', groups);
        //     } else {
        //         groups = this.state.selected.group.filter(group => !this.state.pinned.group.includes(group)).concat(this.state.pinned.group);
        //     }
        //     const card = create.cardViewModel(utility.createHashId(0), {
        //         owner: this.props.select_user.id,
        //         primary: this.basicsForm.current.primary.value,
        //         secondary: this.basicsForm.current.secondary.value,
        //         tag: tags
        //     });


        //     //  <-- Add to db here


        //     // const cards = this.state.cards.map(c => {
        //     //     c.flipped = false;
        //     //     c.top = false;
        //     //     return c
        //     // });
        //     // card.top = true;
        //     // cards.unshift(card);


        //     this.setState(prev => ({
        //         ...prev,
        //         isReloading: true
        //     }));
        //     this.setState(prev => ({
        //         ...prev,
        //         cards: prev.cards.concat(card)
        //     }), () => {
        //         this.setState(prev => ({
        //             ...prev,
        //             isReloading: false
        //         }));
        //     });
        //     this.setState(prev => ({
        //         ...prev,
        //         selected: {
        //             group: [],
        //             tag: []
        //         }
        //     }));
        //     this.basicsForm.current.primary.focus();
        // }
        this._addCard(card);
    }
    handle_onCardDelete = (card) => {
        this._removeCard(card);
    }
   
    // handle_onTagAdd = (category, tag) => {
    //     this._checkForNewTags(category, tag);
    // }

    render () {
        // let notes = (
        //     <Textarea2
        //         config={{
        //             autoComplete: 'off',
        //             label: 'Notes',
        //             maxLength: 128,
        //             name: 'notes',
        //             tabIndex: 3
        //         }}
        //         key='notes'
        //         value={''}>
        //         <Button
        //             className={styles.ToggleButton}
        //             onClick={() => this.handle_onStateToggle('note')}>T</Button>
        //     </Textarea2>
        // );
        // if (!this.state.states.note) {
        //     let notesCss = [styles.ToggleButton];
        //     if (!this.state.states.note) {
        //         notesCss.push(styles.Second);
        //     }
        //     notes = (
        //         <div className={styles.NotesField}>
        //             <div>
        //                 <p>Notes</p>
        //                 <Button
        //                     className={notesCss.join(' ')}
        //                     onClick={() => this.handle_onStateToggle('note')}>T</Button>
        //             </div>
        //         </div>
        //     );
        // }
        // let form = (<Throbber/>)
        // if (!this.state.isReloading) {
        //     form = (
        //         <Aux>
        //             <form
        //                 className={styles.Basics}
        //                 ref={this.basicsForm}>
        //                 <div>
        //                     <TextField2
        //                         config={{
        //                             autoComplete: 'off',
        //                             label: 'Front',
        //                             maxLength: 32,
        //                             name: 'primary',
        //                             tabIndex: 1,
        //                         }}
        //                         key='primary'
        //                         required
        //                         value={''}/>
        //                     <TextField2
        //                         config={{
        //                             autoComplete: 'off',
        //                             label: 'Back',
        //                             maxLength: 64,
        //                             name: 'secondary',
        //                             tabIndex: 2
        //                         }}
        //                         key='secondary'
        //                         required
        //                         value={''}/>
        //                     {notes}
        //                 </div>
        //             </form>
        //             <PinnableTagForm
        //                 category='tag'
        //                 collection={this.state.tag}
        //                 pinned={this.state.pinned.tag}
        //                 selected={this.state.selected.tag}
        //                 state={this.state.states.tag}
        //                 tabIndex={4}
        //                 reference={this.tagForm}
        //                 onConfirm={(tag) => this.handle_onTagAdd('tag', tag)}
        //                 onSelect={this.handle_onTagToggle}
        //                 onToggle={() => this.handle_onStateToggle('tag')}>
        //             </PinnableTagForm>
        //             <PinnableTagForm
        //                 category='group'
        //                 collection={this.state.group}
        //                 pinned={this.state.pinned.group}
        //                 selected={this.state.selected.group}
        //                 state={this.state.states.group}
        //                 tabIndex={5}
        //                 reference={this.groupForm}
        //                 onConfirm={(tag) => this.handle_onTagAdd('group', tag)}
        //                 onSelect={this.handle_onTagToggle}
        //                 onToggle={() => this.handle_onStateToggle('group')}>
        //             </PinnableTagForm>
        //             <Button
        //                 tabIndex={6}
        //                 onClick={this.handle_onCardCreate}>
        //                 Create
        //             </Button>
        //         </Aux>
        //     );
        // }
        return (
            <main className={styles.Creator}>
                <div>
                    <section className={styles.Editor}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CreateForm onCreate={this.handle_onCardCreate}/>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Board}>
                        <div>
                            <div className={styles.Wrapper}>
                                <CardStack
                                    collection={this.state.cards}
                                    max={21}
                                    onAction={this.handle_onCardDelete}/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//         select_token: select.authToken(state),
//         select_user: select.user(state)
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         patchItem_async: (url, token, item) => dispatch(actions.patchItem_async(url, token, item)),
//         putTag_async: (category, token, user, data) => dispatch(actions.putTag_async(category, token, user, data)),
//     };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(Create);

export default Create;