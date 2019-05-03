import React, {Component} from 'react';
import connect from 'react-redux';

import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';
import * as utility from '../../utility';

import withUser from '../../hoc/withUser/withUser';


class Main extends Component {
    state = {
        aside: {
            actions: {},
            data: {},
            state: 0
        },
        decks: this.props.select_decks,
        cards: this.props.select_cards,
        currentTab: 'decks',
        groups: this.props.user.groups,
        history: {
            data: {},
            action: null
        },
        selected: [],
        tags: this.props.user.tags
    }


    render () {
        let content;
        let tab = this.props.user.tabs[this.state.state];
        if (tab) {
            //  If the current user tab exists, render a list view
            content = (
                <List
                    collection={this.state[tab.collection]}
                    filters={this.state.filters}
                    onConfirm={this.onItemDelete}
                    onInspect={this.onItemInspect}
                    onSelect={this.onItemSelect}/>
            );
        } else {
            //  Else render a tab form
        }
    }
}


const mapStateToProps = state => {
    return {
        select_decks: select.decks(state),
        select_cards: select.cards(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem_async: (url, token, id) => dispatch(actions.delete_async(url, token, id)),
        patchItem_async: (url, token, data) => dispatch(actions.patch_async(url, token, data)),
        putItem_async: (url, token, data) => dispatch(actions.put_async(url, token, data)),
        putFilter_async: (url, token, user, data) => dispatch(actions.putUserFilter_async(url, token, user, data)),
        deleteTab_async: (token, user, id) => dispatch(actions.deleteUserTab_async(token, user, id)),
        patchTab_async: (token, user, data) => dispatch(actions.patchUserTab_async(token, user, data)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withUser(Main));