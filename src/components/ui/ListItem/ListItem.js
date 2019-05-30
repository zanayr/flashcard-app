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
        let css = [styles.ListItem];
        if (this.props.selected) {
            css = css.concat(styles.Selected);
        }
        if (this.props.data.flag) {
            css = css.concat(styles.Flagged)
        }
        let tags = utility.sortByAlpha_asc(this.props.data.tag).map(tag => {
            return tag.match(/^\$[a-zA-Z0-9]*/) ? null : (
                <Tag key={tag}>{tag}</Tag>
            );
        });
        return (
            <article
                className={css.join(' ')}
                onClick={(e) => this.onClick(e)}>
                <div>
                    <div key={0}>
                        <h3>{this.props.data.primary}</h3>
                        <p>{this.props.data.secondary}</p>
                    </div>
                    <div
                        className={styles.TagContainer}
                        key={1}>
                        {tags}
                    </div>
                    {this.props.children}
                </div>
            </article>
        );
    }
}


export default ListItem;