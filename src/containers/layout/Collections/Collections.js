import React, {Component} from 'react';
import {connect} from 'react-redux';
import _deckConnection from '../../../database/deck';

import * as actions from '../../../store/actions/index';
import _hashIdCreate from '../../../helper/id';

import Aux from '../../../hoc/aux/Aux';
import Header from '../../../components/ui/Header/Header';
import Throbber from '../../../components/ui/throbber/Throbber';
import List from '../../../components/ui/list/List/List';
import ListHeader from '../../../components/ui/list/ListHeader/ListHeader';
import ActionButton from '../../../components/ui/button/action/ActionButton';
import Aside from '../../../components/ui/asides/Aside';

import '../../../style.css';
import globalCSS from '../../../Global.module.css';
import CollectionsCSS from './Collections.module.css';
import { resolveNaptr } from 'dns';

class Collections extends Component {
    state = {
        action: {
            state: 0
        },
        aside: {
            actions: {},
            data: {},
            isActive: false,
            state: 0
        },
        collections: {
            selected: []
        }
    }

    getCollection () {
        this.props.getCollection_async(this.props.token, this.props.userId);
    }
    updateCollection (payload) {
        this.props.updateCollection_async(this.props.token, this.props.userId, payload);
    }

    componentDidMount () {
        this.getCollection();
    }

    //  Toggle Aside
    toggleAside () {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                isActive: !previousState.aside.isActive
            }
        }));
    }
    updateAsideData (payload) {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                data: {
                    ...previousState.aside.data,
                    title: payload.data.title,
                    details: payload.data.details
                }
            }
        }));
    }
    updateAside (payload) {
        this.setState(previousState => ({
            ...previousState,
            aside: {
                ...previousState.aside,
                actions: {...payload.actions},
                data: {...payload.data},
                state: payload.state
            }
        }));
    }
    handle_onAsideToggle = (payload) => {
        if (this.state.aside.isActive) {
            if (this.state.aside.state === payload.state) {
                this.toggleAside();
            } else {
                this.updateAside(payload);
            }
        } else {
            this.toggleAside();
            this.updateAside(payload);
        }
    }
    handle_onAsideClose = (payload) => {
        if (this.state.aside.isActive) {
            this.toggleAside();
        }
    }


    //  QUICK EDIT  //
    handle_onQucikEditSubmit = (payload) => {
        this.updateCollection(payload);
        this.toggleAside();
    }

    //  LIST EVENT HANDLERS  //
    addSelected (payload) {
        this.setState(previousState => ({
            ...previousState,
            collections: {
                ...previousState.collections,
                selected: [...previousState.collections.selected, payload]
            }
        }));
    }
    removeSelected (payload) {
        let selected = this.state.collections.selected.filter(id => id !== payload);
        this.setState(previousState => ({
            ...previousState,
            collections: {
                ...previousState.collections,
                selected: [...selected]
            }
        }));
    }
    handle_onListDeleteClick = (payload) => {
        this.props.createModal_async({
            actions: {
                onConfirm: () => {
                    console.log('Deleting...');
                },
                onCancel: () => {
                    console.log('Never mind...');
                }
            },
            data: {
                type: 1,
                title: 'Caution',
                message: 'Once you delete a collection it cannot be recovered. Are you sure you want to delete the following collections: ',
                details: [payload.data.title],
                confirm: 'Delete',
                cancel: 'Cancel'
            }
        });
    }
    handle_onListEditClick = (payload) => {
        this.updateAside({
            ...payload,
            actions: {
                ...payload.actions,
                onSubmit: this.handle_onQucikEditSubmit
            }
        });
        this.toggleAside();
    }
    handle_onListItemSelect = (payload) => {
        if (this.state.collections.selected.indexOf(payload) > -1) {
            this.removeSelected(payload);
        } else {
            this.addSelected(payload);
        }
        if (this.state.aside.isActive && this.state.aside.state === 99) {
            this.toggleAside();
        }
    }
    handle_onListItemChange = (payload) => {
        this.updateAsideData(payload)
    }

    //  ACTION BUTTON EVENT HANDLERS  //
    handle_onQuickActionClick = (payload) => {
        return;
    }


    //  RENDER METHOD  //
    render () {
        let list = (<Throbber/>);
        if (!this.props.loading) {
            let collection = {...this.props.collection};
            list = (
                <List
                    backingCollection={collection}
                    onChange={this.handle_onListItemChange}
                    onDelete={this.handle_onListDeleteClick}
                    onEdit={this.handle_onListEditClick}
                    onSelect={this.handle_onListItemSelect}>
                    <ListHeader>Your Flashcards</ListHeader>
                    <ActionButton
                        onClick={this.handle_onQuickActionClick}
                        state={this.state.action.state}
                        values={['Create', 'Study']}/>
                </List>
            );
        }

        return (
            <Aux>
                <Header
                    onA={this.handle_onAsideToggle}
                    onB={this.handle_onAsideToggle}
                    onClick={this.handle_onAsideClose}
                    onNavigation={this.handle_onAsideToggle}/>
                <main
                    className={CollectionsCSS.Main}
                    onClick={this.handle_onAsideClose}>
                    <div className={[globalCSS.Inner, globalCSS.With_Padding].join(' ')}>
                        {list}
                    </div>
                </main>
                <Aside
                    active={this.state.aside.isActive}
                    data={this.state.aside.data}
                    actions={this.state.aside.actions}
                    onClose={this.handle_onAsideClose}
                    state={this.state.aside.state}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        collection: state.deck.decks,
        loading: state.deck.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCollection_async: (token, userId) => dispatch(actions.deckGet_async(token, userId)),
        insertCollection_async: (token, data) => dispatch(actions.deckPost_async(token, data)),
        updateCollection_async: (token, user, payload) => dispatch(actions.deckUpdate_async(token, user, payload)),
        createModal_async: (payload) => dispatch(actions.modalCreate(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);