import React, {Component} from 'react';

import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';
import TagForm from '../../form/Tag/TagForm';

import styles from '../Aside.module.css';


class ReportAside extends Component {
    state = {
        group: [],
        tag: []
    }

    deselect (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].filter(t => t !== tag)
        }));
    }
    select (category, tag) {
        this.setState(prev => ({
            ...prev,
            [category]: prev[category].concat(tag)
        }));
    }
    
    //  TAGS  ---------------------------------------------------------------  TAGS  //
    handle_onTagSelected = (category, tag) => {
        const tags = this.state[category].slice();
        if (tags.includes(tag)) {
            this.deselect(category, tag);
        } else {
            this.select(category, tag);
        }
    }


    render () {
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <TagForm
                        collection={this.props.data.tag}
                        selected={this.state.tag}
                        onToggle={(tag) => this.handle_onTagSelected('tag', tag)}/>
                    <TagForm
                        collection={this.props.data.group}
                        selected={this.state.group}
                        onToggle={(tag) => this.handle_onTagSelected('group', tag)}/>
                    <div className={styles.Footer}>
                        <div>
                            <Button
                                disabled={this.state.valid}
                                onClick={() => this.props.actions.confirm({...this.state})}>
                                Create
                            </Button>
                            <IconButton onClick={this.props.actions.cancel}>x</IconButton>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default ReportAside;