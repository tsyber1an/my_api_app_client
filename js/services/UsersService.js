import request from 'reqwest';
import when from 'when';
import {USERS_URL} from '../constants/UserConstants';
import UserActions from '../actions/UserActions';
import LoginStore from '../stores/LoginStore';

class UsersService {

  getUsers() {
    request({
      url: USERS_URL,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ LoginStore.encodedCredentials
      }
    }).then(function(response) {
      UserActions.getUsers(response);
    });
  }

  addUser(d){
    let data = {
      user: d
    }
    request({
      url: USERS_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ LoginStore.encodedCredentials
      },
      data: data
    })
    .then(function(response) {
      UserActions.addUser(response);
    });
  }

  deleteUser(id){
    request({
      url: USERS_URL + '/' + id,
      method: 'DELETE',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ LoginStore.encodedCredentials
      }
    })
    .then(function(response) {
      UserActions.deleteUser(id);
    });
  }

}

export default new UsersService()
