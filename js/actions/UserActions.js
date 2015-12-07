import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {USERS_GET, CREATE_USER, DELETE_USER} from '../constants/UserConstants.js';
import RouterContainer from '../services/RouterContainer';

export default {
  getUsers: (users) => {
    AppDispatcher.dispatch({
      actionType: USERS_GET,
      users: users
    });
  },
  addUser: (payload) => {
    AppDispatcher.dispatch({
      actionType: CREATE_USER,
      userPayload: payload
    });
    RouterContainer.get().transitionTo('/users');
  },
  deleteUser: (id) => {
    AppDispatcher.dispatch({
      actionType: DELETE_USER,
      userId: id
    });
  }
}
