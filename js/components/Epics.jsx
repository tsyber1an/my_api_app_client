import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';
import AuthenticatedComponent from './AuthenticatedComponent';
import EpicStore from '../stores/EpicStore';
import EpicsService from '../services/EpicsService';

class EpicItem extends React.Component {
    handleClick(e){
      e.preventDefault()

      var epicId = this.props.epicData.id;
      EpicsService.deleteEpic(epicId)
    }
    render() {
        return (
          <div>
            <span className="title">{this.props.epicData.title}</span>
            <p>{this.props.epicData.description}</p>
            <a href="#!" className="secondary-content" onClick={this.handleClick.bind(this)}><i className="material-icons">delete</i></a>
          </div>
        )
    }
}


export default AuthenticatedComponent(class Epics extends React.Component {
  constructor(props) {
     super(props);
     this.state = this.getEpicsState();
     this._onChange = this._onChange.bind(this);
   }

   componentDidMount() {
     EpicsService.getEpics();
     EpicStore.addChangeListener(this._onChange);
   }

   componentWillUnmount() {
     EpicStore.removeChangeListener(this._onChange);
   }

   _onChange() {
     this.setState(this.getEpicsState());
   }

   getEpicsState() {
     return {
       epics: EpicStore.epics
     };
   }

  render() {
    var epics = this.state.epics;

    return (
      <div className="row">
        <Link className="btn-floating btn-large waves-effect waves-light red" to="newEpic"><i className="material-icons">add</i></Link>
        <ul className="collection">
          <li className="collection-header"><h4>Epics</h4></li>
          {Object.keys(epics).map(function(id){
            return <li className="collection-item avatar" key={id}><EpicItem epicData={epics[id]}/></li>
          })}
        </ul>
      </div>
    )
  }
});
