import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import ListItem from '../ui/ListItem/ListItem';

import AppCSS from '../../App.module.css';
import ListCSS from './List.module.css';

class List extends Component {
    state = {
        collection: {...this.props.backingCollection}
    }

    componentDidMount () {
        console.log(this.props.backingCollection);
    }

    handle_onDeleteClick = (payload) => {
        this.props.onDelete({
            key: payload,
            data: {
                title: this.state.collection[payload].title
            }
        });
    }

    handle_onEditClick = (payload) => {
        this.props.onEdit({
            actions: {
                onChange: this.handle_onListItemChange
            },
            data: {
                ...this.state.collection[payload],
                key: payload
            },
            state: 99
        });
    }
    handle_onItemSelect = (payload) => {
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
                    key={key}
                    data={{
                        ...this.state.collection[key],
                        key: key
                    }}
                    deleted={this.props.deletedItems.indexOf(key) > -1}
                    selected={this.props.selectedItems.indexOf(key) > -1}
                    single={this.props.selectedItems.length === 1}
                    onDelete={this.handle_onDeleteClick}
                    onEdit={this.handle_onEditClick}
                    onSelect={this.handle_onItemSelect}/>
            );
        });
        return (
            <Aux>
                {this.props.children}
                <section className={[AppCSS.With_Margin, ListCSS.List].join(' ')}>
                    <div className={AppCSS.Inner}>
                        {listItems}
                    </div>
                </section>
            </Aux>
        );
        // return (
        //     null
        // );
    }
}

export default List;