import React from 'react';

import styles from './Tag.module.css';


const selectTag = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onToggle(props.children);
    }
    let css = [props.className.tag];
    if (props.pinned) {
        css.push(props.className.pinned);
    } else if (props.selected) {
        css.push(props.className.selected);
    }
    if (props.disabled) {
        css.push(props.className.disabled, styles.Disabled);
        return (
            <div className={styles.SelectTag}>
                <span className={css.join(' ')}><p>{props.children.replace('_', ' ')}</p></span>
            </div>
        );
    }
    return (
        <div className={styles.SelectTag}>
            <span
                className={css.join(' ')}
                onClick={(e) => handle_onClick(e)}><p>{props.children.replace('_', ' ')}</p></span>
        </div>
    );
}


export default selectTag;