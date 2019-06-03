import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Tag from '../Tag/Tag';

import styles from './ListItem.module.css';


class ListItem extends Component {
    onClick (e) {
        e.stopPropagation();
        this.props.onSelect();
    }

    render () {
        const css = [styles.ListItem];
        let count = this.props.data.member.length;
        const date = new Date(this.props.data.date).getMonth() + 1 + '/' + new Date(this.props.data.date).getDate() + '/' + new Date(this.props.data.date).getFullYear();
        let flagged = false;
        let meta = (<p className={styles.Meta}>{date}</p>);
        let primary = (<h3 className={styles.Primary}>{this.props.default.primary}</h3>);
        let secondary = (<p className={styles.Secondary}>{this.props.default.secondary}</p>);
        const tags = utility.sortByAlpha_asc(this.props.data.tag).map(tag => {
            if (tag[0] === '$') {
                return null;
            } else if (tag[0] === '&') {
                flagged = true;
                return null;
            } else {
                return (<Tag key={tag}>{tag}</Tag>);
            }
        });

        //  Conditional States  //
        if (count) {
            if (this.props.data.hasOwnProperty('flag')) {
                if (count > 1) {
                    count = count + ' decks';
                } else {
                    count = count + ' deck';
                }
            } else {
                if (count > 1) {
                    count = count + ' cards';
                } else {
                    count = count + ' card';
                }
            }
            meta = (<p className={styles.Meta}>{date} {count}</p>);
        }
        if (flagged) {
            css.push(styles.Flagged)
        }
        if (this.props.data.primary.length) {
            primary = (<h3 className={styles.Primary}>{this.props.data.primary}</h3>);
        }
        if (this.props.data.secondary.length) {
            secondary = (<h3 className={styles.Secondary}>{this.props.data.secondary}</h3>);
        }
        if (this.props.selected) {
            css.push(styles.Selected);
        }
        return (
            <article
                className={css.join(' ')}
                onClick={(e) => this.onClick(e)}>
                <div>
                    <div
                        className={styles.DataContainer}
                        key={0}>
                        {primary}
                        {secondary}
                        {meta}
                    </div>
                    <div
                        className={styles.TagContainer}
                        key={1}>
                        <div className={styles.TagList}>
                            {tags}
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </article>
        );
    }
}


export default ListItem;