import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (userData) => {
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      userData: userData
    });

    var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
    RouterContainer.get().transitionTo(nextPath);

  }
}
