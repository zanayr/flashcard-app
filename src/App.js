import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Layout from './containers/layout/Layout';

import CSS from './App.module.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={CSS.app}>
          <Layout/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
