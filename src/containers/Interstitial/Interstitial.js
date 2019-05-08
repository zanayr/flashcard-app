import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as select from '../../store/reducers/root';

import Throbber from '../../components/ui/Throbber/Throbber';


class Interstitial extends Component {
    state = {
        data: {},
        isLoading: true
    }
    getCollectionMembers (collection) {
        switch (collection) {
            case 'deck':
                return this.props.select_cards;
            default:
                break;
        }
    }
    componentDidMount() {
        const data = {};
        const collection = this.props.select_collection;
        console.log(collection);
        const members = this.getCollectionMembers(this.props.location.state.collection);
        Object.keys(members).map(id => {
            if (collection.members.includes(id)) {
                data[id] = members[id];
            }
        });
        this.setState(prev => ({
            data: data
        }));
        this.setState(prev => ({
            isLoading: false
        }));
    }

    
    render() {
        let interstitial = (<Throbber/>);
        if (!this.state.isLoading) {
            interstitial = <Redirect to={{
                pathname: '/u/' + this.props.location.state.collection + '/' + this.props.location.state.id,
                state: {
                    data: this.state.data
                }
            }}/>;
        }
        return (interstitial)
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.location.state.collection);
    return {
        select_cards: select.cards(state),
        select_collection: select.collection(state, ownProps.location.state.collection, ownProps.location.state.id)
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         getAllItems_async: (url, token, user) => dispatch(actions.getAllItems_async(url, token, user)),
//         getUser_async: (token, auth) => dispatch(actions.getUser_async(token, auth))
//     };
// };


export default connect(mapStateToProps, null)(Interstitial);