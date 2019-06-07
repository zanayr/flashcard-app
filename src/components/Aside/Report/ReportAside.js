import React, {Component} from 'react';

import * as utility from '../../../utility/utility';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';


class ReportAside extends Component {
    state = {
        filter: 'tag',
        group: [],
        tag: []
    }
    setFilter (tag) {
        this.setState(prev => ({
            ...prev,
            filter: tag
        }));
    }
    deselectTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].filter(t => t !== tag)
        }));
    }
    selectTag (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    
    handle_onFilterSelect = (tag) => {
        this.setFilter(tag);
    }
    handle_onTagSelected = (category, tag) => {
        const tags = this.state[category].slice();
        if (tags.includes(tag)) {
            this.deselectTag(category, tag);
        } else {
            this.selectTag(category, tag);
        }
    }


    render () {
        let tagTabCSS = '';
        let groupTabCSS = '';
        const formCSS = {
            selected: styles.Report_Selected,
            tag: styles.Report_Tag
        };
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
                        collection={utility.sortByAlpha_asc(this.props.data[this.state.filter])}
                        disabled={[]}
                        selected={this.state[this.state.filter]}
                        styles={formCSS}
                        onToggle={(tag) => this.handle_onTagSelected(this.state.filter, tag)}/>
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                className={styles.Confirm}
                                disabled={this.state.valid}
                                onClick={() => this.props.actions.confirm({...this.state})}>
                                Create
                            </Button>
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

export default ReportAside;