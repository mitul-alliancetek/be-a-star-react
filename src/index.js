import React, { Component } from 'react';
import './index.css';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { storeConfigure } from './api/store';
import { Provider } from 'react-redux';
import HomePage from './HomePage/HomePage';
import Login from './Auth/Login';
import Register from './Auth/Register';

import "bootstrap/dist/css/bootstrap.min.css"

class MainApp extends Component {
  render() {
    return (
      <Provider store={storeConfigure()}>
            <BrowserRouter>
              <Switch >
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </BrowserRouter>
      </Provider>
    );
  }
}

render(<MainApp />, document.getElementById('root'));