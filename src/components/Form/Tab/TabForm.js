import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import TextField from '../../ui/input/Field/TextField';
import Button from '../../ui/button/Button/Button';
import TagForm from '../../form/Tag/TagForm';
import CollectionToggle from '../../ui/toggle/Collection/CollectionToggle';

import styles from './TabForm.module.css';

class TabForm extends Component {
    state = {
        collection: '',
        name: '',
        tags: [],
        groups: []
    }


    form = React.createRef();

    handle_onChange = (target, value) => {
        this.setState(prev => ({
            ...prev,
            [target]: value
        }));
    }
    handle_onFormConfirm = () => {
        if (this.form.current.reportValidity() && (this.state.tags.length > 0 || this.state.groups.length > 0) && this.state.collection.length > 0) {
            this.props.onConfirm({...this.state});
        }
    }
    //  Coll  //
    handle_onCollectionSelect = collection => {
        this.setState(prev => ({
            ...prev,
            collection: collection
        }));
    }

    handle_onTagCreate = (category, tag) => {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    handle_onTagToggle = (category, tag) => {
        const tags = this.state[category];
        if (tags.indexOf(tag) > -1) {
            this.setState(prev => ({
                ...prev,
                [category]: prev[category].filter(t => t !== tag)
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                [category]: prev[category].concat(tag)
            }));
        }
    }

    render () {
        return (
            <div
                className={styles.TabForm}
                onClick={(e) => e.stopPropagation()}>
                <div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        ref={this.form}>
                        <div>
                            <TextField
                                config={{
                                    label: 'Tab Name',
                                    maxLength: 24,
                                    minLength: 3,
                                    placeholder: 'Tab Name',
                                    value: this.state.name
                                }}
                                key='name'
                                onChange={this.handle_onChange}
                                required
                                target='name'/>
                        </div>
                    </form>
                    <h4>Collection</h4>
                    <CollectionToggle
                        backingCollection={['deck', 'card']}
                        toggle={this.handle_onCollectionSelect}/>
                    <h4>Tags</h4>
                    <TagForm
                        activeCollection={this.state.tags}
                        backingCollection={this.props.tags}
                        field={{
                            label: 'Additional Tag',
                            placeholder: 'Verb'
                        }}
                        onClick={(tag) => this.handle_onTagToggle('tags', tag)}
                        onConfirm={(tag) => this.handle_onTagCreate('tags', tag)}/>
                    <h4>Groups</h4>
                    <TagForm
                        activeCollection={this.state.groups}
                        backingCollection={this.props.groups}
                        field={{
                            label: 'Additional Group',
                            placeholder: 'Spanish'
                        }}
                        onClick={(tag) => this.handle_onTagToggle('groups', tag)}
                        onConfirm={(tag) => this.handle_onTagCreate('groups', tag)}/>
                    <Button
                        key='add'
                        onClick={this.handle_onFormConfirm}
                        type='submit'>
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

export default TabForm;