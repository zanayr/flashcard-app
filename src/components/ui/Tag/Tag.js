import React from 'react';

import styles from './Tag.module.css';

const tag = (props) => {
    let css = [styles.Tag];
    if (props.active) {
        css.push(styles.Active);
    }

    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <div
            className={css.join(' ')}
            onClick={(e) => handle_onClick(e)}>
            <div>
                <p>{props.children}</p>
            </div>
        </div>
    );
}


export default tag;