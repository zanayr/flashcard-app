import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as select from '../../store/reducers/root';

import {Redirect} from 'react-router-dom';
import Throbber from '../../components/ui/Throbber/Throbber';

import styles from './In.module.css';


class In extends Component {
    componentDidMount() {
        this.props.get_async('user', this.props.select_authToken, this.props.select_authUser);
        this.props.getAll_async('card', this.props.select_authToken, this.props.select_authUser);
        this.props.getAll_async('deck', this.props.select_authToken, this.props.select_authUser);
    }

    
    render() {
        let content = (<Throbber className={styles.Throbber}/>);
        if (!this.props.select_decksIsLoading && !this.props.select_cardsIsLoading && !this.props.select_userIsLoading) {
            if (this.props.select_user.suspend) {
                content = <Redirect to={{
                    pathname: '/alt',
                    state: {
                        message: 'Your account has been suspended. Please contact the administrator to resolve this issue.'
                    }
                }}/>;
            } else {
                content = <Redirect to='/0/deck'/>;
            }
        }

        return (
            <main className={styles.In}>
                <div>
                    {content}
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => {
    return {
        select_authToken: select.authToken(state),
        select_authUser: select.authUser(state),
        select_user: select.user(state),
        select_cardsIsLoading: select.cardsIsLoading(state),
        select_decksIsLoading: select.decksIsLoading(state),
        select_userIsLoading: select.userIsLoading(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        get_async: (store, token, id) => dispatch(actions.get_async(store, token, id)),
        getAll_async: (store, token, user) => dispatch(actions.getAll_async(store, token, user)),
        getAllUsers_async: (token) => dispatch(actions.getAllUsers_async(token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(In);