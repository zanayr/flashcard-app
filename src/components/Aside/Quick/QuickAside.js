import React, {Component} from 'react';

import BarButton from '../../ui/button/Bar/BarButton';
import BarLink from '../../ui/link/Bar/BarLink';
import CardInspectForm from '../../form/Card/CardInspectForm';
import DeckInspectForm from '../../form/Deck/DeckInspectForm';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';


class InspectAside extends Component {
    state = {
        actions: this.props.actions,
        groups: this.props.data.groups,
        item: this.props.data.item,
        tags: this.props.data.tags
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
        this.props.actions.onChange(this.state.item, {
            target: target,
            value: value
        });
    }
    handle_onConfirm = () => {
        if (this.form.current.reportValidity()) {
            this.props.actions.onConfirm(this.state.item);
        }
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
        this.props.actions.onChange(this.state.item, {
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
            this.props.actions.onChange(this.state.item, {
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
            this.props.actions.onChange(this.state.item, {
                target: category,
                value: tags.concat(tag)
            });
        }
    }



    render () {
        let form = (
            <DeckInspectForm
                deck={this.state.item}
                onChange={this.handle_onChange}/>
        );
        if (this.state.item.type === 'card') {
            form = (
                <CardInspectForm
                    card={this.state.item}
                    onChange={this.handle_onChange}/>
            );
        }

        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <div>
                    <h3>Quick Inspect</h3>
                    <p>Instructions about this aside here.</p>
                    <form
                        className={styles.QuickForm}
                        ref={this.form}>
                        {form}
                    </form>
                    <h4>Tags</h4>
                    <TagForm
                        activeCollection={this.state.item.tags}
                        backingCollection={this.state.tags}
                        field={{
                            label: 'Additional Tag',
                            placeholder: 'Verb'
                        }}
                        onClick={(tag) => this.handle_onTagToggle('tags', tag)}
                        onConfirm={(tag) => this.handle_onTagCreate('tags', tag)}/>
                    <h4>Groups</h4>
                    <TagForm
                        activeCollection={this.state.item.groups}
                        backingCollection={this.state.groups}
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

export default InspectAside;