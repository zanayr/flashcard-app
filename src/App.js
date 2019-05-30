import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as select from './store/reducers/root';
import * as actions from './store/actions/index';

import Auth from './containers/Auth/Auth';
import Collection from './containers/Collection/Collection';
import Create from './containers/Create/Create';
import In from './containers/In/In';
import Inspector from './containers/Inspector/Inspector';
import Item from './containers/Item/Item';
import Load from './containers/Load/Load';
import Modal from './components/modal/Modal/Modal';
import Out from './containers/Out/Out';
import Profile from './containers/Profile/Profile';
import Report from './containers/Report/Report';
import Study from './containers/Study/Study';
import User from './containers/User/User';

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
          data={modal.data}
          type={modal.type}
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
          <Route path='/0/:collection/:id' component={Inspector}/>
          <Route path='/0/:collection' component={Collection}/>
          <Route path='/1/:item' component={Item}/>
          <Route path='/2/create' component={Profile}/>
          <Route path='/2/user/:id' component={Profile}/>
          <Route path='/2/user' component={User}/>
          <Route path='/auth' exact component={Auth}/>
          <Route path='/create' exact component={Create}/>
          {/* <Route path='/load/:store/:id' component={Interstitial}/>*/}
          <Route path='/load/' exact component={Load}/>
          <Route path='/in' exact component={In}/>
          <Route path='/out' exact component={Out}/>
          <Route path='/report' exact component={Report}/>
          {/* <Route path='/review' exact component={Review}/> */}
          <Route path='/study' exact component={Study}/>
          {/* If no matches, redirect to sign in */}
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