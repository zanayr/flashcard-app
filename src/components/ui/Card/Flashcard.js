import React from 'react';

import Tag from '../Tag/Tag';

import styles from './Card.module.css';


const flashcard = (props) => {
    let display = (
        <div>
            <p className={styles.Display}>{props.data.primary}</p>
        </div>
    );
    let flag = null;

    const handle_onNextClick = (e) => {
        e.stopPropagation();
        props.actions.next();
    }
    const handle_onPrevClick = (e) => {
        e.stopPropagation();
        props.actions.prev();
    }


    if (props.data.tag.includes('&flagged')) {
        flag = (<span className={styles.Flag}></span>);
    }
    if (props.state) {
        display = (
            <div>
                <p className={styles.Display}>{props.data.secondary}</p>
                {props.children}
                {flag}
                <div className={styles.TagList}>
                    <div>
                        {props.data.tag.map((tag, i) => {
                            if (tag.match(/^\$|&/)) {
                                return null;
                            } else {
                                return (<Tag key={i}>{tag}</Tag>);
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <article className={styles.Card}>
            {display}
            {flag}
            <span
                className={styles.Prev}
                onClick={handle_onPrevClick}></span>
            <span
                className={styles.Next}
                onClick={handle_onNextClick}></span>
        </article>
    )
}


export default flashcard;