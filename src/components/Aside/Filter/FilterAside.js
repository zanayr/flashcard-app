import React, {Component} from 'react';

import * as sortTypes from '../../../utility/sortTypes';
import * as utility from '../../../utility/utility';

import styles from '../Aside.module.css';

class FilterAside extends Component {
    handle_onSelect = (tag) => {
        this.props.actions.toggle(tag);
    }

    render () {
        const dict = {};
        this.props.data.all.forEach(tag => {
            dict[tag.replace('$', '')] = tag;
        });

        const tagButtons = utility.sortByAlpha_asc(Object.keys(dict)).map((key, i) => {
            let css = [styles.FilterButton];
            let tag = dict[key];
            let name = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
            if (this.props.data.filter.includes(tag)) {
                css.push(styles.Active);
            } else if (this.props.data.tab.includes(tag)) {
                css.push(styles.Static);
                return (
                    <div
                        className={css.join(' ')}
                        key={i + 1}>
                        <div>
                            <p>{name}</p>
                        </div>
                    </div>
                );
            }
            return (
                <div
                    className={css.join(' ')}
                    key={i + 1}
                    onClick={() => this.handle_onSelect(tag)}>
                    <div>
                        <p>{name}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <h3>Filter</h3>
                    <p>Instructions on how to filter here.</p>
                    <div className={styles.FilterAside}>
                        <div>
                            {tagButtons}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside;