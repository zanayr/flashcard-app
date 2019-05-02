import React, {Component} from 'react';

import * as utility from '../../../utility';

import Tag from '../../ui/Tag/Tag';
import TagField from '../../ui/input/Tag/TagField';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class TagForm extends Component {
    state = {
        add: '',
        tags: this.props.backingCollection
    }
    form = React.createRef();

    validate () {
        return this.form.current.reportValidity();
    }

    handle_onAdd = value => {
        if (this.validate() && value.length > 0) {
            this.setState(prev => ({
                add: '',
                tags: prev.tags.concat(value)
            }));
            this.props.add(value);
        }
    }
    handle_onChange = (value) => {
        this.setState(prev => ({
            ...prev,
            add: value
        }));
    }


    render () {
        let tags = utility.sortAlpha(this.state.tags).map(tagName => {
            let isActive = false;
            if (this.props.activeCollection.indexOf(tagName) > -1) {
                isActive = true;
            }

            return (
                <Tag
                    active={isActive}
                    key={tagName}
                    onClick={() => this.props.toggle(tagName)}>
                    {tagName}
                </Tag>
            );
        });
        let field = null;
        if (this.props.field) {
            field = (
                <form ref={this.form}>
                    <div>
                        <TagField
                            action={this.handle_onChange}
                            label={this.props.field.label}
                            placeholder={this.props.field.placeholder}
                            value={this.state.add}/>
                        <Button onClick={() => this.handle_onAdd(this.state.add)}>Add</Button>
                    </div>
                </form>
            );
        }


        return (
            <div className={styles.TagForm}>
                <div>
                    {tags}
                    {field}
                </div>
            </div>
        );
    }
}


export default TagForm;