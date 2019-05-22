import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import Aux from '../../hoc/Aux/Aux';
import Throbber from '../../components/ui/Throbber/Throbber';


class In extends Component {
    componentDidMount() {
        const token = this.props.select_authToken;
        const user = this.props.select_authUser;
        this.props.getAll_async('card', token, user);
        this.props.getAll_async('class', token, user);
        this.props.getAll_async('deck', token, user);
        this.props.getAll_async('student', token, user);
        this.props.get_async('user', token, user);
    }

    
    render() {
        let content = (<Throbber/>);
        if (!this.props.select_decksIsLoading && !this.props.select_cardsIsLoading && !this.props.select_userIsLoading) {
            content = <Redirect to='/u/deck'/>;
        }

        return (
            <Aux>
                {content}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_cardsIsLoading: select.cardsIsLoading(state),
        select_decksIsLoading: select.decksIsLoading(state),
        select_userIsLoading: select.userIsLoading(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        get_async: (store, token, id) => dispatch(actions.get_async(store, token, id)),
        getAll_async: (store, token, user) => dispatch(actions.getAll_async(store, token, user))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(In);