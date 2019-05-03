import React, {Component} from 'react';

import * as utility from '../../../utility';

import Tag from '../../ui/Tag/Tag';
import TagField from '../../ui/input/Tag/TagField';
import Button from '../../ui/button/Button/Button';

import styles from './TagForm.module.css';


class TagForm extends Component {
    state = {
        tag: '',
        tags: this.props.backingCollection
    }
    form = React.createRef();


    handle_onConfirm = value => {
        if (this.form.current.reportValidity() && value.length > 0) {
            this.setState(prev => ({
                tag: '',
                tags: prev.tags.concat(value)
            }));
            this.props.onConfirm(value);
        }
    }
    handle_onChange = (value) => {
        this.setState(prev => ({
            ...prev,
            tag: value
        }));
    }


    render () {
        let tags = utility.sortAlpha(this.state.tags).map((tag, i) => {
            return (
                <Tag
                    active={this.props.activeCollection.indexOf(tag) > -1}
                    key={utility.createHashId(i)}
                    onClick={() => this.props.onClick(tag)}>
                    {tag}
                </Tag>
            );
        });
        let field = null;
        if (this.props.field) {
            field = (
                <form ref={this.form}>
                    <div>
                        <TagField
                            onChange={this.handle_onChange}
                            label={this.props.field.label}
                            placeholder={this.props.field.placeholder}
                            value={this.state.tag}/>
                        <Button onClick={() => this.handle_onConfirm(this.state.tag)}>Add</Button>
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