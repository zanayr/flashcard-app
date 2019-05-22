import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import Aux from '../../hoc/Aux/Aux';
import Throbber from '../../components/ui/Throbber/Throbber';


class Load extends Component {
    componentDidMount() {
        const token = this.props.select_authToken;
        const user = this.props.select_authUser;
        this.props.getAll_async(this.props.match.params.store, token, user);
    }

    
    render() {
        let content = (<Throbber/>);
        if (!this.props.select_isLoading) {
            content = <Redirect to={'/u/' + this.props.match.params.store}/>;
        }

        return (
            <Aux>
                {content}
            </Aux>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_isLoading: select.isLoading(state, ownProps.match.params.store),
        select_collection: select.collections(state, ownProps.match.params.store)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAll_async: (store, token, user) => dispatch(actions.getAll_async(store, token, user))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Load);