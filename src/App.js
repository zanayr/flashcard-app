import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Layout from './containers/layout/Layout';

import AppCSS from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={AppCSS.App}>
        <Layout/>
      </div>
    );
  }
}

export default App;
