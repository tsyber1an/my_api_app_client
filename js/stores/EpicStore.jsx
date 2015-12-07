import {EPICS_GET, CREATE_EPIC, DELETE_EPIC, EPIC_PRIORITIES} from '../constants/EpicConstants';
import BaseStore from './BaseStore';

class EpicStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._epicId = 0;
    this._epics = [];
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case EPICS_GET:
        this._epics = action.epics;
        this.emitChange();
        break;
      case CREATE_EPIC:
        this._epics.push(action.epicPayload);
        this.emitChange();
        break;
      case DELETE_EPIC:
        this._epics = this._epics.filter(function(u){ return u.id != action.epicId })
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get epics() {
    return this._epics;
  }

  get newEpic(){

    return {
      title: '',
      description: '',
      priority: EPIC_PRIORITIES[0]
    }
  }
}

export default new EpicStore();
