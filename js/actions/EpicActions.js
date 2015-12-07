import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {EPICS_GET, CREATE_EPIC, DELETE_EPIC} from '../constants/EpicConstants.js';
import RouterContainer from '../services/RouterContainer';

export default {
  getEpics: (epics) => {
    AppDispatcher.dispatch({
      actionType: EPICS_GET,
      epics: epics
    });
  },
  addEpic: (payload) => {
    AppDispatcher.dispatch({
      actionType: CREATE_EPIC,
      epicPayload: payload
    });
    RouterContainer.get().transitionTo('/epics');
  },
  deleteEpic: (id) => {
    AppDispatcher.dispatch({
      actionType: DELETE_EPIC,
      epicId: id
    });
  }
}
