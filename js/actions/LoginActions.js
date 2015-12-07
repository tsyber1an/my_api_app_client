import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (userData, encodedCredentials) => {
    var savedDigest = localStorage.getItem('digest');

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      userData: userData,
      encodedCredentials: encodedCredentials
    });

    var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
    RouterContainer.get().transitionTo(nextPath);
    localStorage.setItem('digest', encodedCredentials);

  },

  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('digest');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
