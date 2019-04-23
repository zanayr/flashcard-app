import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Aux from '../../hoc/aux/Aux';
import Auth from './auth/Auth';
import Logout from './auth/logout/Logout';
import Main from './main/Main';
import Collections from './Collections/Collections';
//import Modal from '../../components/ui/modal/Modal';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    componentDidMount() {
        this.props.onAutoLogin();
    }
    render() {
        /*
        const modals = Object.keys(this.props.modals).map(k => {
            if (this.props.modals[k].active) {
                return (
                    <Modal 
                        key={k}
                        message={this.props.modals[k].message}
                        modalId={k}/>
                );
            }
        });
        */
        let routes = (
            <Switch>
                <Route path="/auth" exact component={Auth}/>
                <Redirect to="/auth"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/u" exact component={Collections}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/auth" exact component={Auth}/>
                    <Redirect to="/auth"/>
                </Switch>
            );
        }
        return (
            <Aux>
                {routes}
                {/*modals*/}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        modals: state.modal.modals
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAutoLogin: () => dispatch(actions.authCheckState_async())
    };
};

export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(Layout));