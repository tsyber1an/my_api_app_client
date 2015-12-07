import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._encodedCredentials = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._user = action.userData;
        this._encodedCredentials = action.encodedCredentials;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._user = null;
        this._encodedCredentials = null;
        this.emitChange();
      default:
        break;
    };
  }

  get encodedCredentials(){
    return this._encodedCredentials;
  }

  get user() {
    return this._user;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
