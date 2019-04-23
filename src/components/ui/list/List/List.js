import React, {Component} from 'react';

import Aux from '../../../../hoc/aux/Aux';
import ListItem from '../item/ListItem';

import globalCSS from '../../../../Global.module.css';
import ListCSS from './List.module.css';

class List extends Component {
    state = {
        isSingle: false,
        collection: {},
        selectedIds: []
    }

    componentDidMount () {
        this.setState(previousState => ({
            ...previousState,
            collection: this.props.backingCollection
        }));
    }

    toggleIsSingle () {
        this.setState(previousState => ({
            ...previousState,
            isSingle: previousState.selectedIds.length === 1
        }));
    }
    removeSelectedId (payload) {
        const selected = this.state.selectedIds.filter(id => id !== payload);
        this.setState(previousState => ({
            ...previousState,
            selectedIds: [...selected]
        }), () => {
            this.toggleIsSingle();
        });
    }
    addSelectedId (payload) {
        this.setState(previousState => ({
            ...previousState,
            selectedIds: [...previousState.selectedIds, payload]
        }), () => {
            this.toggleIsSingle();
        });
    }

    handle_onDeleteClick = (payload) => {
        this.props.onDelete({
            data: {
                id: payload,
                title: this.state.collection[payload].title,
                details: this.state.collection[payload].details
            }
        });
    }
    handle_onEditClick = (payload) => {
        this.props.onEdit({
            actions: {
                onChange: this.handle_onListItemChange
            },
            data: {
                id: payload,
                title: this.state.collection[payload].title,
                details: this.state.collection[payload].details
            },
            state: 99
        });
    }
    handle_onItemSelect = (payload) => {
        if (this.state.selectedIds.indexOf(payload) > -1) {
            this.removeSelectedId(payload);
        } else {
            this.addSelectedId(payload);
        }
        this.props.onSelect(payload);
    }
    handle_onListItemChange = (payload) => {
        let collection = this.state.collection;
        collection[payload.data.id][payload.data.property] = payload.data.value;

        this.setState(previousState => ({
            ...previousState,
            collection: {
                ...collection
            }
        }), () => {
            this.props.onChange({
                data: {
                    title: this.state.collection[payload.data.id].title,
                    details: this.state.collection[payload.data.id].details
                }
            });
        });
    }

    render() {
        let listItems = Object.keys(this.state.collection).map(key => {
            return (
                <ListItem
                    data={{
                        ...this.state.collection[key],
                        id: key
                    }}
                    key={key}
                    onDelete={this.handle_onDeleteClick}
                    onEdit={this.handle_onEditClick}
                    onSelect={this.handle_onItemSelect}
                    selected={this.state.selectedIds.indexOf(key) > -1}
                    single={this.state.isSingle}/>
            );
        });
        return (
            <Aux>
                {this.props.children}
                <section className={[globalCSS.With_Margin, ListCSS.List].join(' ')}>
                    <div className={globalCSS.Inner}>
                        {listItems}
                    </div>
                </section>
            </Aux>
        );
    }
}

export default List;