import React from 'react';

import styles from './Tag.module.css';


const tag2 = (props) => {
    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onToggle(props.children);
    }
    let css = [];
    if (props.pinned) {
        css.push(styles.Pinned);
    } else if (props.selected) {
        css.push(styles.Selected);
    }
    return (
        <div className={styles.Tag2}>
            <span
                className={css.join(' ')}
                onClick={(e) => handle_onClick(e)}><p>{props.children.replace('_', ' ')}</p></span>
        </div>
    );
}


export default tag2;