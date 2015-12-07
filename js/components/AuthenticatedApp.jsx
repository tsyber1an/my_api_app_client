'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m4 l3">
          <Link to="home">My Api App</Link>
          {this.headerItems}
        </div>
        <div className="col s12 m8 l9">
          <div className="row">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>)
    } else {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="users">Users</Link>
        </li>
      </ul>)
    }
  }
}
