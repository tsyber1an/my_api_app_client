import React from 'react';
import ReactMixin from 'react-mixin';
import AuthenticatedComponent from './AuthenticatedComponent';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';
import UsersService from '../services/UsersService';
import RouterContainer from '../services/RouterContainer'
import linkState from 'react-link-state';


export default AuthenticatedComponent(class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewUserState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getNewUserState() {
    return UserStore.newUser
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.login.trim() != '' &&
       this.state.password != '' &&
       this.state.password == this.state.password_confirmation) {
        UsersService.addUser(this.state);
        this.setState(this.getNewUserState());
    }
  }

  render() {
    return (
      <div className="row">
        <h1>New User</h1>
        <form onSubmit={this.handleSubmit} className="col s12" autoComplete='off'>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" name="login" valueLink={linkState(this, 'login')} />
                <label htmlFor="login">Login</label>
              </div>
              <div className="input-field col s6">
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="password" name="password" valueLink={linkState(this, 'password')} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="password" name="password_confirmation" valueLink={linkState(this, 'password_confirmation')} />
                <label htmlFor="password_confirmation">Password confirmation</label>
              </div>
            </div>
          <div className="row">
            <button type="submit" className="btn waves-effect waves-light">Add User</button>
          </div>
        </form>
      </div>
    )
  }

});

ReactMixin(AuthenticatedComponent.prototype, React.addons.LinkedStateMixin);
