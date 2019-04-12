import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import Aux from '../../hoc/aux/aux';
import Auth from './auth/Auth';
import Main from './main/Main';

class Layout extends Component {
    state = {
        user_name: "u"
    }
    render() {
        return (
            <Aux>
                <Route path="/" exact component={Auth}/>
                <Route path={"/" + this.state.user_name} exact component={Main}/>
            </Aux>
        );
    }
}

export default withRouter(Layout);