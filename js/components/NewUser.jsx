import React from 'react';
import ReactMixin from 'react-mixin';
import { Route, RouteHandler, Link } from 'react-router';
import AuthenticatedComponent from './AuthenticatedComponent';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';
import UsersService from '../services/UsersService';
import RouterContainer from '../services/RouterContainer'
import linkState from 'react-link-state';
import {USER_ROLES} from '../constants/UserConstants';

class UserRoleOption extends React.Component {
  render() {
    return <option value={this.props.role_value}>{this.props.role_name}</option>
  }
}

export default AuthenticatedComponent(class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewUserState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getNewUserState() {
    return UserStore.newUser
  }

  componentDidMount(){
    $('select').material_select();
  }

  componentDidUpdate(){
    $('select').material_select();
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
  getUserRoleOptions(){
    var options = [], i;
    {for (i = 0; i < USER_ROLES.length; i++) {
      options.push(<UserRoleOption role_name={USER_ROLES[i]} role_value={i}/>)
    }}

    return options;
  }

  // TODO: not impl.
  onSelectChange(){
    return false;
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
              <div className="input-field col s6">
                <select name="role" onChange={this.onSelectChange.bind(this)}>
                    {this.getUserRoleOptions()}
                </select>
                <label htmlFor="role">Role</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s3">
                <button type="submit" className="btn waves-effect waves-light">Add User</button>
              </div>
              <div className="input-field col s3">
                <Link className="btn-flat" to="users">Cancel</Link>
              </div>
            </div>
        </form>
      </div>
    )
  }

});
