import React from 'react';
import ReactMixin from 'react-mixin';
import { Route, RouteHandler, Link } from 'react-router';
import AuthenticatedComponent from './AuthenticatedComponent';
import EpicActions from '../actions/EpicActions';
import EpicsService from '../services/EpicsService';
import RouterContainer from '../services/RouterContainer'
import linkState from 'react-link-state';
import {EPIC_PRIORITIES} from '../constants/EpicConstants';
import EpicStore from '../stores/EpicStore';

class EpicPriorOption extends React.Component {
  render() {
    return <option value={this.props.value}>{this.props.label}</option>
  }
}

export default AuthenticatedComponent(class NewEpic extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getNewEpicState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getNewEpicState() {
    return {
      title: '',
      description: '',
      priority: EPIC_PRIORITIES[0]
    }
  }

  componentDidMount(){
    $('select').material_select();
  }

  componentDidUpdate(){
    $('select').material_select();
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.title.trim() != '' && this.state.description.trim() != '') {
        EpicsService.addEpic(this.state);
        this.setState(this.getNewEpicState());
    }
  }
  getEpicPrioritiesOptions(){
    var options = [], i;
    {for (i = 0; i < EPIC_PRIORITIES.length; i++) {
      options.push(<EpicPriorOption label={EPIC_PRIORITIES[i]} value={i}/>)
    }}

    return options;
  }

  // TODO: not impl.
  onSelectChange(){
    return false;
  }

  render() {
    return (
      <div className="row">
        <h1>New Epic</h1>
        <form onSubmit={this.handleSubmit} className="col s12" autoComplete='off'>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" name="title" valueLink={linkState(this, 'title')} />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s6">
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <textarea name="description" key={'description'} className="materialize-textarea" valueLink={linkState(this, 'description')} >
                </textarea>
                <label htmlFor="description">description</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <select name="role" onChange={this.onSelectChange.bind(this)}>
                    {this.getEpicPrioritiesOptions()}
                </select>
                <label htmlFor="role">Priority</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s3">
                <button type="submit" className="btn waves-effect waves-light">Add Epic</button>
              </div>
              <div className="input-field col s3">
                <Link className="btn-flat" to="epics">Cancel</Link>
              </div>
            </div>
        </form>
      </div>
    )
  }

});
