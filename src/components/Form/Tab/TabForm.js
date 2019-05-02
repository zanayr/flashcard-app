import React, {Component} from 'react';

import TextField from '../../ui/input/Field/TextField';
import Button from '../../ui/button/Button/Button';
import TagForm from '../../form/Tag/TagForm';

import styles from './TabForm.module.css';

class TabForm extends Component {
    state = {
        collections: [],
        name: '',
        tags: [],
        groups: []
    }


    form = React.createRef();

    //  Tags & Groups  //
    add (collection, item) {
        this.setState(prev => ({
            ...prev,
            [collection]: prev[collection].concat(item)
        }));
    }
    remove (collection, item) {
        this.setState(prev => ({
            ...prev,
            [collection]: prev[collection].filter(i => i !== item)
        }));
    }

    //  Name  //
    validate () {
        return this.form.current.reportValidity();
    }

    handle_onChange = (target, value) => {
        this.setState(prev => ({
            ...prev,
            [target]: value
        }));
    }
    handle_onFormConfirm = () => {
        if (this.validate()) {
            this.props.onConfirm({...this.state});
        }
    }
    //  Coll  //
    handle_onCollToggle = coll => {
        if (this.state.collections.indexOf(coll) > -1) {
            this.remove('collections', coll);
        } else {
            this.add('collections', coll);
        }
    }
    //  Tags  //
    handle_onTagToggle = tag => {
        if (this.state.tags.indexOf(tag) > -1) {
            this.remove('tags', tag);
        } else {
            this.add('tags', tag);
        }
    }
    //  Groups  //
    handle_onGroupToggle = group => {
        if (this.state.groups.indexOf(group) > -1) {
            this.remove('groups', group);
        } else {
            this.add('groups', group);
        }
    }

    render () {
        console.log(this.props);
        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                ref={this.form}>
                <div>
                    <TextField
                        config={{
                            label: 'Tab Name',
                            maxLength: 32,
                            minLength: 3,
                            placeholder: 'Tab Name',
                            value: this.state.name
                        }}
                        key='name'
                        onChange={this.handle_onChange}
                        required
                        target='name'/>
                    <h4>Collection</h4>
                    <TagForm
                        activeCollection={this.state.collections}
                        backingCollection={['decks', 'cards']}
                        toggle={this.handle_onCollToggle}/>
                    <h4>Tags</h4>
                    <TagForm
                        activeCollection={this.state.tags}
                        backingCollection={this.props.tags}
                        toggle={this.handle_onTagToggle}/>
                    <h4>Groups</h4>
                    <TagForm
                        activeCollection={this.state.groups}
                        backingCollection={this.props.groups}
                        toggle={this.handle_onGroupToggle}/>
                    <Button
                        key='add'
                        onClick={this.handle_onFormConfirm}
                        type='submit'>
                        Add
                    </Button>
                </div>
            </form>
        );
    }
}

export default TabForm;