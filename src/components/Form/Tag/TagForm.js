import React from 'react';

import * as utility from '../../../utility/utility';

import SelectTag from '../../ui/Tag/SelectTag';

import styles from './TagForm.module.css';


const tagForm = (props) => {
    let tags = utility.sortByAlpha_asc(props.collection).map((tag, i) => {
        return (
            <SelectTag
                key={i}
                selected={props.selected.includes(tag)}
                onToggle={(tag) => props.onToggle(tag)}>
                {tag}
            </SelectTag>
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