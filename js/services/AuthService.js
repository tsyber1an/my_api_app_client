import request from 'reqwest';
import when from 'when';
import {LOGIN_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(encodedCredentials) {
    return this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ encodedCredentials
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        LoginActions.loginUser(response);
        return true;
      });
  }
}

export default new AuthService()
