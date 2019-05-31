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
        let primary = (<h3 className={styles.Placeholder}>{this.props.default.primary}</h3>);
        let secondary = (<p className={styles.Placeholder}>{this.props.default.secondary}</p>);
        if (this.props.data.primary.length) {
            primary = (<h3 className={styles.Primary}>{this.props.data.primary}</h3>);
        }
        if (this.props.data.secondary.length) {
            secondary = (<h3 className={styles.Secondary}>{this.props.data.secondary}</h3>);
        }
        return (
            <article
                className={css.join(' ')}
                onClick={(e) => this.onClick(e)}>
                <div>
                    <div key={0}>
                        {primary}
                        {secondary}
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