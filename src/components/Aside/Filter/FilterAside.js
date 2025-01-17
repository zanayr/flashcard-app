import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';

class FilterAside extends Component {
    state = {
        filter: 'tag'
    }
    setFilter (tag) {
        this.setState({filter: tag});
    }

    handle_onFilterSelect = (tag) => {
        this.setFilter(tag);
    }
    handle_onTagToggle = (tag) => {
        this.props.actions.toggle(this.state.filter, tag);
    }
    
    render () {
        let tagTabCSS = '';
        let groupTabCSS = '';
        let formCSS = {
            disabled: styles.Filter_Disabled,
            selected: styles.Filter_Selected,
            tag: styles.Filter_Tag
        }
        if (this.state.filter === 'tag') {
            tagTabCSS = styles.Active;
        } else {
            groupTabCSS = styles.Active;
        }
        return (
            <aside className={styles.Aside}>
                <div>
                    <div className={styles.Interface}>
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
                        collection={utility.sortByAlpha_asc(this.props.data.all[this.state.filter])}
                        disabled={this.props.data.tab[this.state.filter]}
                        selected={this.props.data.filter[this.state.filter]}
                        styles={formCSS}
                        onToggle={this.handle_onTagToggle}/>
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                className={styles.Confirm}
                                onClick={this.props.actions.confirm}>{this.props.data.labels.confirm}</Button>
                            <IconButton
                                className={styles.Cancel}
                                onClick={this.props.actions.cancel}>⨯</IconButton>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default FilterAside;