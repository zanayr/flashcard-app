import React, {Component} from 'react';

import AsideOverlay from '../../Overlay/Aside/AsideOverlay';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../ui/button/Button/Button';
import IconButton from '../../ui/button/Icon/IconButton';

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
        const collections = this.props.data.all.map((collection, i) => {
            let css = [styles.AssignButton];
            let title = collection.primary;
            let details = collection.secondary;
            if (this.state.selected.includes(collection.id)) {
                css.push(styles.Active);
            }
            return (
                <div
                    className={css.join(' ')}
                    key={i + 1}
                    onClick={() => this.handle_onSelect(collection.id)}>
                    <div>
                        <h3 className={styles.Title}>{title}</h3>
                        <p className={styles.Details}>{details}</p>
                    </div>
                </div>
            );
        });
        return (
            <Aux>
                <aside className={[styles.Aside].join(' ')}>
                    <div>
                        <div className={styles.Header}>
                            <div>
                                <p className={styles.Message}>Assign or unassign a card to one or many decks by selecting them below. A card is not required to belong to a deck, but will be marked as unassigned.</p>
                            </div>
                        </div>
                        <div className={styles.AssignAside}>
                            <div>
                                {collections}
                            </div>
                        </div>
                        <div className={styles.Footer}>
                            <div>
                                <Button onClick={() => this.props.actions.confirm(this.state.selected.slice())}>{this.props.data.labels.confirm}</Button>
                                <IconButton onClick={this.props.actions.cancel}>⨯</IconButton>
                            </div>
                        </div>
                    </div>
                </aside>
                <AsideOverlay
                    action={() => this.props.actions.overlay(this.state.selected.slice())}
                    active={true}/>
            </Aux>
        );
    }
}



export default AssignAside;