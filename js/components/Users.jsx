import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';
import AuthenticatedComponent from './AuthenticatedComponent';
import UserStore from '../stores/UserStore';
import UsersService from '../services/UsersService';

var USER_ROLES = ['ADMIN', 'USER', 'GUEST'];
class UserItem extends React.Component {
    render() {
        return (
          <div>
            <span className="title">{this.props.userData.login}</span>
            <p>
              {USER_ROLES[this.props.userData.role]}
            </p>
            <a href="#!" className="secondary-content" }><i className="material-icons">delete</i></a>
          </div>
        )
    }
}


export default AuthenticatedComponent(class Users extends React.Component {
  constructor(props) {
     super(props);
     this.state = this.getUsersState();
     this._onChange = this._onChange.bind(this);
   }

   componentDidMount() {
     UsersService.getUsers();
     UserStore.addChangeListener(this._onChange);
   }

   componentWillUnmount() {
     UserStore.removeChangeListener(this._onChange);
   }

   _onChange() {
     this.setState(this.getUsersState());
   }

   getUsersState() {
     return {
       users: UserStore.users
     };
   }

  render() {
    var users = this.state.users;

    return (
      <div className="row">
        <Link className="btn-floating btn-large waves-effect waves-light red" to="newUser"><i className="material-icons">add</i></Link>
        <ul className="collection">
          <li className="collection-header"><h4>Users</h4></li>
          {Object.keys(users).map(function(id){
            return <li className="collection-item avatar" key={id}><UserItem userData={users[id]}/></li>
          })}
        </ul>
      </div>
    )
  }
});
