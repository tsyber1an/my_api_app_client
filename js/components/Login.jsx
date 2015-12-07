import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService'
import linkState from 'react-link-state';

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      login: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();

    Auth.login(btoa(this.state.login + ':' + this.state.password))
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
      <div className="valign-wrapper row">
        <div className="login valign">
          <h1>Login</h1>
          <form role="form">
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <input type="text" valueLink={linkState(this, 'login')} className="form-control" id="login" placeholder="login" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" valueLink={linkState(this, 'password')} className="form-control" id="password" ref="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
        </form>
      </div>
    </div>
    );
  }
}
