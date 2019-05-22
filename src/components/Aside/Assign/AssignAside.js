import React, {Component} from 'react';

import Button from '../../ui/button/Button/Button';

import styles from '../Aside.module.css';

class AssignAside extends Component {
    state = {
        selected: this.props.data.member
    }

    _addSelected (collection) {
        this.setState({selected: this.state.selected.concat(collection)});
    }
    _removeSelected (collection) {
        this.setState({selected: this.state.selected.filter(id => id !== collection)});
    }

    handle_onSelect = (collection) => {
        const selected = this.state.selected.slice();
        if (selected.includes(collection)) {
            this._removeSelected(collection);
        } else {
            this._addSelected(collection);
        }
    }

    render () {
        const collectionButtons = this.props.data.all.map((collection, i) => {
            let css = [styles.AssignButton];
            let name = collection.primary;
            if (this.state.selected.includes(collection.id)) {
                css.push(styles.Active);
            }
            return (
                <div
                    className={css.join(' ')}
                    key={i + 1}
                    onClick={() => this.handle_onSelect(collection.id)}>
                    <div>
                        <p>{name}</p>
                    </div>
                </div>
            );
        });
        
        return (
            <aside className={[styles.Aside].join(' ')}>
                <div>
                    <h3>Assign</h3>
                    <p>Instructions on how to assign here.</p>
                    <div className={styles.AssignAside}>
                        <div>
                            {collectionButtons}
                        </div>
                    </div>
                    <Button onClick={() => this.props.actions.confirm(this.state.selected)}>Confirm</Button>
                    <Button onClick={this.props.actions.cancel}>Cancel</Button>
                </div>
            </aside>
        );
    }
}



export default AssignAside;