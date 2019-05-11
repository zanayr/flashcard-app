import React from 'react';

import styles from './Card.module.css';


const card = (props) => {
    let css = [styles.Card];
    let display = (
        <div>
            <p>{props.data.primary}</p>
        </div>
    );
    if (props.data.flipped) {
        display = (
            <div>
                <p>{props.data.secondary}</p>
                {props.children}
                <div className={styles.TagList}>
                    <div>
                        <p>{props.data.tag.join(', ')}</p>
                    </div>
                </div>
            </div>
        );
    }
    if (props.position && !props.data.selected) {
        css.push(styles.Under);
    }
    if (props.position && props.data.selected) {
        css.push(styles.Pulled);
    }

    const handle_onClick = (e) => {
        e.stopPropagation();
        props.onSelect();
    }

    return (
        <article
            className={css.join(' ')}
            style={{
                bottom: props.position * 24,
                zIndex: props.data.zIndex}}
            onClick={handle_onClick}>
            {display}
        </article>
    )
}


export default card;