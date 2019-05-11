import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import Aux from '../../hoc/Aux/Aux';
import Throbber from '../../components/ui/Throbber/Throbber';


class In extends Component {
    componentDidMount() {
        this.props.getAllCards_async(this.props.select_token, this.props.select_user);
        this.props.getAllDecks_async(this.props.select_token, this.props.select_user);
        this.props.getUser_async(this.props.select_token, this.props.select_user);
    }

    
    render() {
        let inContent = (<Throbber/>);
        if (!this.props.select_decksIsLoading && !this.props.select_cardsIsLoading && !this.props.select_userIsLoading) {
            inContent = <Redirect to='/u/deck'/>;
        }
        return (
            <Aux>
                {inContent}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_cardsIsLoading: select.cardsIsLoading(state),
        select_decksIsLoading: select.decksIsLoading(state),
        select_token: select.authToken(state),
        select_user: select.authUser(state),
        select_userIsLoading: select.userIsLoading(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllCards_async: (token, user) => dispatch(actions.getAllCards_async(token, user)),
        getAllDecks_async: (token, user) => dispatch(actions.getAllDecks_async(token, user)),
        getUser_async: (token, auth) => dispatch(actions.getUser_async(token, auth))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(In);