import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as utility from '../../utility/utility';

import Aux from '../../hoc/Aux/Aux';
import TextField from '../../components/ui/input/Field/TextField';
import TextArea from '../../components/ui/input/TextArea/TextArea';
import Button from '../../components/ui/button/Button/Button';
import PinnableTagForm from '../../components/form/Tag/PinnableTagForm';

import styles from './Create.module.css';


// const Tag2 = (props) => {
//     const handle_onClick = (e) => {
//         e.stopPropagation();
//         props.onToggle(props.children);
//     }
//     let css = [styles.Tag2];
//     if (props.pinned) {
//         css.push(styles.Pinned);
//     } else if (props.selected) {
//         css.push(styles.Selected);
//     }
    
//     return (
//         <span
//             className={css.join(' ')}
//             onClick={(e) => handle_onClick(e)}><p>{props.children}</p></span>
//     );
// }

// class TagField2 extends Component {
//     state = {
//         value: ''
//     }

//     handle_onChange = (value) => {
//         this.setState({value: value})
//     }

//     render () {
//         return (
//             <div className={styles.Field}>
//                 <div>
//                     <label>{this.props.label}</label>
//                     <input
//                         className={styles.Input}
//                         maxLength={24}
//                         placeholder={this.props.label}
//                         required
//                         type='text'
//                         value={this.state.value}
//                         name='tag'
//                         onChange={(e) => this.handle_onChange(e.target.value)}/>
//                 </div>
//             </div>
//         );
//     }
// }

// class TagEditor extends Component {
//     state = {
//         value: this.props.value
//     }

//     handle_onChange = (value) => {
//         this.setState({value: value});
//     }

//     render () {
//         return (
//             <div className={styles.Field}>
//                 <div>
//                     <label>{this.props.label}</label>
//                     <textarea
//                         className={styles.Input}
//                         placeholder={this.props.label}
//                         value={this.state.value}
//                         name='editor'
//                         onChange={(e) => this.handle_onChange(e.target.value)}/>
//                     {this.props.children}
//                 </div>
//             </div>
//         );
//     }
// }

// class TagForm2 extends Component {
//     // state = {
//     //     tag: ''
//     // }
//     form = React.createRef();

//     handle_onAddClick = () => {
//         const tag = this.form.current.elements['tag'].value;
//         if (this.form.current.reportValidity() && !this.props.collection.includes(tag)) {
//             this.props.onConfirm(tag);
//         }
//     }

//     render () {
//         let tags = this.props.collection.map((tag, i) => {
//             return (
//                 <Tag2
//                     key={utility.createHashId(i)}
//                     pinned={this.props.pinned.includes(tag)}
//                     selected={this.props.selected.includes(tag)}
//                     onToggle={(tag) => this.props.onToggle(this.props.category, tag)}>
//                     {tag}
//                 </Tag2>
//             )
//         });

//         return (
//             <Aux>
//                 {tags}
//                 <form
//                     className={styles.TagForm2}
//                     ref={this.form}>
//                     <div>
//                         <TagField2 lablel={'new ' + this.props.category}/>
//                         <Button onClick={this.handle_onAddClick}>Add</Button>
//                     </div>
//                 </form>
//                 {this.props.children}
//             </Aux>
//         );
//     }
// }

class Create extends Component {
    state = {
        card: {
            group: [],
            notes: '',
            primary: '',
            secondary: '',
            tag: []
        },
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
    // handle_onTagFormToggle = (category) => {
    //     this.setState(prev => ({
    //         ...prev,
    //         states: {
    //             ...prev.states,
    //             [category]: !prev.states[category]
    //         }
    //     }));
    // }
    handle_onStateToggle = (state) => {
        this.setState(prev => ({
            ...prev,
            states: {
                ...prev.states,
                [state]: !prev.states[state]
            }
        }));
    }

    render () {
        // let tagsField = null;
        // let groupsField = null;
        // if (!this.state.group) {
        //     groupsField = (
        //         <form
        //             className={styles.TextArea}
        //             key='groups'
        //             ref={this.groupForm}>
        //             <div>
        //                 <TagEditor
        //                     label='Groups'
        //                     value={this.state.pinned.groups.join(', ')}>
        //                     <Button onClick={this.handle_onGroupToggle}>T</Button>
        //                 </TagEditor>
        //             </div>
        //         </form>
        //     );
        // } else {
        //     groupsField = (
        //             <TagForm2
        //                 category={'groups'}
        //                 collection={utility.sortByAlpha_asc(this.state.groups)}
        //                 key={'groups'}
        //                 pinned={this.state.pinned.groups}
        //                 selected={this.state.card.groups}
        //                 state={this.state.groupState}
        //                 onConfirm={this.handle_onTagCreate}
        //                 onToggle={this.handle_onTagToggle}>
        //                 <Button onClick={this.handle_onGroupToggle}>T</Button>
        //             </TagForm2>
                
        //     )
        // }
        // if (!this.state.tag) {
        //     tagsField = (
        //         <form
        //             className={styles.TextArea}
        //             key='tags'
        //             ref={this.groupForm}>
        //             <div>
        //                 <TagEditor
        //                     label='Tags'
        //                     value={this.state.pinned.groups.join(', ')}>
        //                     <Button onClick={this.handle_onTagToggle}>T</Button>
        //                 </TagEditor>
        //             </div>
        //         </form>
        //     );
        // } else {
        //     tagsField = (
        //             <TagForm2
        //                 category={'tags'}
        //                 collection={utility.sortByAlpha_asc(this.state.groups)}
        //                 key={'tags'}
        //                 pinned={this.state.pinned.groups}
        //                 selected={this.state.card.groups}
        //                 state={this.state.groupState}
        //                 onConfirm={this.handle_onTagCreate}
        //                 onToggle={this.handle_onTagToggle}>
        //                 <Button onClick={this.handle_onTagToggle}>T</Button>
        //             </TagForm2>
                
        //     )
        // }
        let notes = (
            <TextArea
                config={{
                    label: 'Notes',
                    maxLength: 128,
                    placeholder: 'Notes',
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
                                <form className={styles.Basics}>
                                    <div>
                                        <TextField
                                            config={{
                                                label: 'Front',
                                                maxLength: 32,
                                                minLength: 6,
                                                placeholder: 'Front',
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
                                    onSelect={this.handle_onTagToggle}
                                    onToggle={() => this.handle_onStateToggle('tag')}>
                                </PinnableTagForm>
                                <PinnableTagForm
                                    category='group'
                                    collection={this.state.group}
                                    pinned={this.state.pinned.group}
                                    selected={this.state.card.group}
                                    state={this.state.states.group}
                                    onSelect={this.handle_onTagToggle}
                                    onToggle={() => this.handle_onStateToggle('group')}>
                                </PinnableTagForm>
                                <Button onClick={this.handle_onCardCreate}>Create</Button>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Board}>
                        <div>
                            <article>
                                <div>
                                    <h1>This is a card</h1>
                                </div>
                            </article>
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