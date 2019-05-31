import React, {Component} from 'react';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import * as select from '../../store/reducers/root';

import {Redirect} from 'react-router-dom';
import Throbber from '../../components/ui/Throbber/Throbber';


class Load extends Component {
    state = {
        path: this.props.location.state.store === 'deck' ? '/0/deck/' + this.props.location.state.data.id : '/2/user'
    }

    componentDidMount () {
        switch (this.props.location.state.store) {
            case 'deck':
                this.props.add_async('deck', this.props.select_authToken, this.props.location.state.data);
                break;
            case 'user':
                this.props.getAllUsers_async(this.props.select_authToken, this.props.select_authUser);
                break;
            default:
                break;
        }
        
    }

    render () {
        console.log(this.props.select_decksIsLoading);
        let content = (<Throbber/>);
        if (this.props.location.state.store === 'deck' ? !this.props.select_decksIsLoading : !this.props.select_usersIsLoading) {
            content = <Redirect to={this.state.path}/>
        }
        return (
            <main>
                <div>
                    {content}
                </div>
            </main>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_decksIsLoading: select.decksIsLoading(state),
        select_usersIsLoading: select.userIsLoading(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add_async: (store, token, items) => dispatch(actions.add_async(store, token, items)),
        getAllUsers_async: (token, user) => dispatch(actions.getAllUsers_async(token, user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Load);