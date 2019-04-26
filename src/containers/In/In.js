import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import Aux from '../../hoc/Aux/Aux';
import Throbber from '../../components/ui/Throbber/Throbber';


class In extends Component {
    componentDidMount() {
        this.props.getAllDecks_async(this.props.select_token, this.props.select_user);
    }

    
    render() {
        let inContent = (<Throbber/>);
        if (!this.props.select_deckIsLoading) {
            inContent = <Redirect to="/u"/>;
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
        select_deckIsLoading: select.deckIsLoading(state),
        select_token: select.authToken(state),
        select_user: select.authUser(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllDecks_async: (token, user) => dispatch(actions.getAllDecks_async(token, user)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(In);