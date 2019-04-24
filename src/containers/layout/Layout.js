import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Aux from '../../hoc/aux/Aux';
import Auth from '../Auth/Auth';
import Logout from '../Out/Out';
import Collections from '../Collections/Collections';
import Inspector from '../Inspector/Inspector';
import Modal from '../../components/ui/modal/Modal';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        modals: []
    }
    componentDidMount() {
        this.props.onAutoLogin();
        this.setState(previousState => ({
            ...previousState,
            modals: [...this.props.modals]
        }));
    }
    render() {
        const modals = this.props.modals.map((modal, i) => {
            modal.data.index = i;
            return (
                <Modal 
                    key={modal.data.id}
                    actions={modal.actions}
                    data={modal.data}/>
            );
        });
        let routes = (
            <Switch>
                <Route path='/auth' exact component={Auth}/>
                <Redirect to='/auth'/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/u' exact component={Collections}/>
                    <Route path='/u/inspect' exact component={Inspector}/>
                    <Route path='/logout' exact component={Logout}/>
                    <Route path='/auth' exact component={Auth}/>
                    <Redirect to='/auth'/>
                </Switch>
            );
        }
        return (
            <Aux>
                {routes}
                {modals}
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