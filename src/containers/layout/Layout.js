import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Aux from '../../hoc/aux/aux';
import Auth from './auth/Auth';
import Logout from './auth/logout/Logout';
import Main from './main/Main';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        user_name: "u"
    }
    componentDidMount() {
        this.props.onAutoLogin();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Auth}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
            <Switch>
                <Route path={"/" + this.state.user_name} exact component={Main}/>
                <Route path="/logout" exact component={Logout}/>
                <Redirect to="/"/>
            </Switch>
            );
        }
        return (
            <Aux>
                {routes}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAutoLogin: () => dispatch(actions.authCheckState_async())
    };
};

export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(Layout));