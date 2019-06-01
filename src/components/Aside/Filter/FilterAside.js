import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';

class FilterAside2 extends Component {
    state = {
        dictionary: {},
        filter: 'tag'
    }

    componentDidMount () {
        const dictionary = {};
        this.props.data.all[this.state.filter].forEach(tag => {
            dictionary[tag.replace('$', '')] = tag;
        });
        this.setState(prev => ({
            ...prev,
            dictionary: dictionary
        }));
    }

    setDictionary (tag) {
        const dictionary = {};
        this.props.data.all[tag].forEach(tag => {
            dictionary[tag.replace('$', '')] = tag;
        });
        this.setState(prev => ({
            ...prev,
            dictionary: dictionary
        }));
    }
    setFilter (tag) {
        this.setState(prev => ({
            ...prev,
            filter: tag
        }));
    }

    handle_onFilterSelect = (tag) => {
        this.setFilter(tag);
        this.setDictionary(tag);
    }
    handle_onTagToggle = (tag) => {
        this.props.actions.toggle(this.state.filter, this.state.dictionary[tag]);
    }

    render () {
        let tagTabCSS = '';
        let groupTabCSS = '';
        if (this.state.filter === 'tag') {
            tagTabCSS = styles.Active;
        } else {
            groupTabCSS = styles.Active;
        }

        return (
            <aside className={styles.Aside}>
                <div>
                    <div className={styles.FilterHeader}>
                        <div>
                            <Button
                                className={tagTabCSS}
                                onClick={() => this.handle_onFilterSelect('tag')}>Tags</Button>
                            <Button
                                className={groupTabCSS}
                                onClick={() => this.handle_onFilterSelect('group')}>Groups</Button>
                        </div>
                    </div>
                    <TagForm
                        collection={utility.sortByAlpha_asc(Object.keys(this.state.dictionary)).map((tag => {return tag}))}
                        disabled={this.props.data.tab[this.state.filter]}
                        selected={this.props.data.filter[this.state.filter]}
                        onToggle={this.handle_onTagToggle}/>
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                className={styles.Confirm}
                                onClick={this.props.actions.confirm}>{this.props.data.labels.confirm}</Button>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside2;