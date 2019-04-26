import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as select from './store/reducers/root';
import * as actions from './store/actions/index';

import Auth from './containers/Auth/Auth';
import Collections from './containers/Collections/Collections';
import In from './containers/In/In';
import Inspector from './containers/Inspector/Inspector';
import Modal from './components/modal/Modal/Modal';
import Out from './containers/Out/Out';

import AppCSS from './App.module.css';



class App extends Component {
  componentDidMount() {
    this.props.checkAuth_async();
  }
  
  render () {
    const modals = this.props.select_modals.map((modal, i) => {
      return (
        <Modal 
          key={i}
          data={modal}
          uniqueId={i}/>
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
          <Route path='/in' exact component={In}/>
          <Route path='/out' exact component={Out}/>
          <Route path='/auth' exact component={Auth}/>
          <Redirect to='/auth'/>
        </Switch>
      );
    }

    return (
      <div className={AppCSS.App}>
          {routes}
          {modals}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: select.authToken(state) !== null,
    select_modals: select.modals(state),

  }
};
const mapDispatchToProps = dispatch => {
  return {
    checkAuth_async: () => dispatch(actions.checkAuth_async())
  };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(App))