import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Aux from '../../hoc/aux/aux';
import Auth from './auth/Auth';
import Logout from './auth/logout/Logout';
import Main from './main/Main';

class Layout extends Component {
    state = {
        user_name: "u"
    }
    render() {
        return (
            <Aux>
                <Switch>
                    <Route path={"/" + this.state.user_name} exact component={Main}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/" exact component={Auth}/>
                </Switch>
            </Aux>
        );
    }
}

export default withRouter(Layout);