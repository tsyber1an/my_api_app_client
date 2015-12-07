import request from 'reqwest';
import when from 'when';
import {EPICS_URL} from '../constants/EpicConstants';
import EpicActions from '../actions/EpicActions';
import LoginStore from '../stores/LoginStore';

class EpicsService {

  getEpics() {
    request({
      url: EPICS_URL,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ LoginStore.encodedCredentials
      }
    }).then(function(response) {
      EpicActions.getEpics(response);
    });
  }

  addEpic(d){
    let data = {
      epic: d
    }
    request({
      url: EPICS_URL,
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
      EpicActions.addEpic(response);
    });
  }

  deleteEpic(id){
    request({
      url: EPICS_URL + '/' + id,
      method: 'DELETE',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Accept': 'application/vnd.example.v1',
        'Authorization': 'Basic '+ LoginStore.encodedCredentials
      }
    })
    .then(function(response) {
      EpicActions.deleteEpic(id);
    });
  }

}

export default new EpicsService()
