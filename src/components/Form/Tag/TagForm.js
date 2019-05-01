import React, {Component} from 'react';

import * as utility from '../../../utility';

import Tag from '../../ui/Tag/Tag';

import styles from './TagForm.module.css';


class TagForm extends Component {
    render () {
        let tags = utility.sortAlpha(this.props.backingCollection).map(tagName => {
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

        return (
            <div className={styles.TagForm}>
                <div>
                    {tags}
                </div>
            </div>
        );
    }
}


export default TagForm;