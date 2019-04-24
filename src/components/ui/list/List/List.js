import React, {Component} from 'react';

import Aux from '../../../../hoc/aux/Aux';
import ListItem from '../item/ListItem';

import globalCSS from '../../../../Global.module.css';
import ListCSS from './List.module.css';

class List extends Component {
    state = {
        collection: {...this.props.backingCollection}
    }

    componentDidMount () {
        // this.setState(previousState => ({
        //     ...previousState,
        //     collection: this.props.backingCollection
        // }));
        console.log(this.props.backingCollection);
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
                        id: key
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