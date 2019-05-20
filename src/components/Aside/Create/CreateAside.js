import React, {Component} from 'react';

import BarLink from '../../ui/link/Bar/BarLink';
import DeckCreateForm from '../../form/Deck/DeckCreateForm';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';


class CreateAside extends Component {
    state = {
        actions: this.props.actions,
        groups: [],
        tags: []
    }
    form = React.createRef();

    //  FORM  ---------------------------------------------------------------  FORM  //
    handle_onChange = (target, value) => {
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [target]: value
            }
        }));
        this.props.actions.change(this.state.item, {
            target: target,
            value: value
        });
    }

    
    //  TAGS  ---------------------------------------------------------------  TAGS  //
    handle_onTagCreate = (category, tag) => {
        const tags = this.state.item[category];
        this.setState(prev => ({
            ...prev,
            item: {
                ...prev.item,
                [category]: prev.item[category].concat(tag)
            }
        }));
        this.props.actions.change(this.state.item, {
            target: category,
            value: tags.concat(tag)
        });
    }
    handle_onTagToggle = (category, tag) => {
        const tags = this.state.item[category];
        if (tags.indexOf(tag) > -1) {
            this.setState(prev => ({
                ...prev,
                item: {
                    ...prev.item,
                    [category]: prev.item[category].filter(t => t !== tag)
                }
            }));
            this.props.actions.change(this.state.item, {
                target: category,
                value: tags.filter(t => t !== tag)
            });
        } else {
            this.setState(prev => ({
                ...prev,
                item: {
                    ...prev.item,
                    [category]: prev.item[category].concat(tag)
                }
            }));
            this.props.actions.change(this.state.item, {
                target: category,
                value: tags.concat(tag)
            });
        }
    }

    

    render () {
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <div>
                    <h3>Quick Inspect</h3>
                    <p>Instructions about this aside here.</p>
                    <form
                        ref={this.form}>
                        <DeckCreateForm onChange={this.handle_onChange}/>
                    </form>
                    <h4>Tags</h4>
                    <TagForm
                        activeCollection={this.state.tags}
                        backingCollection={this.props.data.tags}
                        field={{
                            label: 'Additional Tag',
                            placeholder: 'Verb'
                        }}
                        onClick={(tag) => this.handle_onTagToggle('tags', tag)}
                        onConfirm={(tag) => this.handle_onTagCreate('tags', tag)}/>
                    <h4>Groups</h4>
                    <TagForm
                        activeCollection={this.state.groups} 
                        backingCollection={this.props.data.groups}
                        field={{
                            label: 'Additional Group',
                            placeholder: 'Spanish'
                        }}
                        onClick={(tag) => this.handle_onTagToggle('groups', tag)}
                        onConfirm={(tag) => this.handle_onTagCreate('groups', tag)}/>
                    </div>
                    <div>
                        <BarLink path='u/inspect'>Edit</BarLink>
                    </div>
                </div>
            </aside>
        );
    }
}

export default CreateAside;