import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import * as select from './store/reducers/root';
import {connect} from 'react-redux';

import AppCSS from './App.module.css';

import Auth from './containers/Auth/Auth';
import In from './containers/In/In';
import Out from './containers/Out/Out';
import Collections from './containers/Collections/Collections';
import Inspector from './containers/Inspector/Inspector';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.checkAuth_async();
  }
  
  render () {
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
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: select.authToken(state) !== null
  }
};
const mapDispatchToProps = dispatch => {
  return {
    checkAuth_async: () => dispatch(actions.checkAuth_async())
  };
};


export default withRouter(connect(mapStateToProps,  mapDispatchToProps)(App))