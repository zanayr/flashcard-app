import React from 'react';

import * as utility from '../../../utility/utility';

import Tag2 from '../../ui/Tag/Tag2';

import styles from './TagForm.module.css';


const tagForm = (props) => {
    let tags = utility.sortByAlpha_asc(props.collection).map((tag, i) => {
        return (
            <Tag2
                key={i}
                selected={props.selected.includes(tag)}
                onToggle={(tag) => props.onToggle(tag)}>
                {tag}
            </Tag2>
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


export default tagForm;