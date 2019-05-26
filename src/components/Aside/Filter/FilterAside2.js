import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';

import styles from '../Aside.module.css';

class FilterAside2 extends Component {
    state = {
        filter: 'tag'
    }
    handle_onSelect = (tag) => {
        
        this.props.actions.toggle(this.state.filter, tag);
    }
    handle_onTabClick = (tag) => {
        this.setState({filter: tag});
    }

    render () {
        const dict = {};
        this.props.data.all[this.state.filter].forEach(tag => {
            dict[tag.replace('$', '')] = tag;
        });

        const tagButtons = utility.sortByAlpha_asc(Object.keys(dict)).map((key, i) => {
            let css = [styles.FilterButton];
            let tag = dict[key];
            let name = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
            if (this.props.data.filter[this.state.filter].includes(tag)) {
                css.push(styles.Active);
            } else if (this.props.data.tab[this.state.filter].includes(tag)) {
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
                    <div className={styles.Header}>
                        <div>
                            <Button onClick={() => this.handle_onTabClick('tag')}>Tags</Button>
                            <Button onClick={() => this.handle_onTabClick('group')}>Groups</Button>
                        </div>
                    </div>
                    <h3>Filter</h3>
                    <p>Instructions on how to filter here.</p>
                    <div className={styles.FilterAside}>
                        <div>
                            {tagButtons}
                        </div>
                    </div>
                    <div className={styles.Footer}>
                        <div>
                            <IconButton onClick={this.props.actions.cancel}>x</IconButton>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside2;