import React, {Component} from 'react';

import styles from '../Aside.module.css';

class FilterAside extends Component {
    handle_onSelect = (tag) => {
        this.props.actions.toggle(tag);
    }

    render () {
        const tagButtons = this.props.data.all.map((tag, i) => {
            let css = [styles.FilterButton];
            let name = tag.replace('$', '');
            if (this.props.data.filter.includes(tag)) {
                css.push(styles.Active);
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